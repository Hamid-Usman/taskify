import { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { BoardHeader } from "../components/header/boardHeader";
import { CardType, ColumnType } from "../props/cardColumn";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { Column } from "../components/board/columns";
import { AddColumnButton } from "../components/board/addColumn";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/loading";

type BoardType = {
  id: number;
  title: string;
  columns: ColumnType[];
};

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("authToken");

export const CustomKanban = () => {
  const { pk } = useParams<{ pk: string }>();

  if (!pk) {
    return <div className="text-white text-center">Error: Board ID not provided</div>;
  }

  return (
    <>
      <Header />
      <div className="h-screen w-full pt-20 text-neutral-50">
        <Board boardID={parseInt(pk)} />
      </div>
    </>
  );
};

const Board = ({ boardID }: { boardID: number }) => {
  const [board, setBoard] = useState<BoardType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token provided");
        setError("No token provided");
        return;
      }
      try {
        const response = await fetch(`${apiUrl}/boards/${boardID}/board/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Couldn't fetch board data");
        }
        const data = await response.json();
        setBoard(data);
      } catch (err) {
        console.error("Error fetching board:", err);
        setError((err as Error).message || "An unexpected error occurred");
      }
    };

    fetchBoard();
  }, [boardID]);

  const addColumn = async (title: string) => {
    if (!token) {
      console.error("No token provided");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/columns/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
          title,
          order: board?.columns.length || 0,
          board: boardID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add column");
      }

      const newColumn = await response.json();
      setBoard((prevBoard) =>
        prevBoard
          ? {
              ...prevBoard,
              columns: [...prevBoard.columns, newColumn],
            }
          : prevBoard
      );
    } catch (err) {
      console.error("Error adding column:", err);
      setError((err as Error).message || "An unexpected error occurred");
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const cardID = event.active.id;
    const card = board?.columns
      .flatMap((column) => column.cards)
      .find((card) => card.id.toString() === cardID);
    setActiveCard(card || null);
  };

  const handleDropEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !activeCard) {
      setActiveCard(null);
      return;
    }
  
    const initialColumn = board?.columns.find((col) =>
      col.cards.some((card) => card.id.toString() === active.id)
    );
    const targetColumn = board?.columns.find((col) =>
      col.id.toString() === over.id
    );
  
    if (!initialColumn || !targetColumn) return;
  
    // Ensure valid position
    const newPosition = targetColumn.cards.length;
  
    const payload = {
      target_column_id: targetColumn.id,
      new_position: newPosition,
    };
  
    console.log("Moving card with payload:", payload); // Debugging
  
    try {
      const response = await fetch(`${apiUrl}/cards/${active.id}/move/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.error || "Failed to update card position");
      }
  
      // Optimistically update UI
      setBoard((prevBoard) => {
        if (!prevBoard) return prevBoard;
  
        const updatedColumns = prevBoard.columns.map((col) => {
          if (col.id === initialColumn.id) {
            return {
              ...col,
              cards: col.cards.filter((card) => card.id !== activeCard.id),
            };
          } else if (col.id === targetColumn.id) {
            return {
              ...col,
              cards: [...col.cards, activeCard],
            };
          } else {
            return col;
          }
        });
  
        return { ...prevBoard, columns: updatedColumns };
      });
  
      setActiveCard(null);
    } catch (err) {
      console.error("Error updating card position:", err);
      setError((err as Error).message || "An unexpected error occurred");
    }
  };
  

  if (error) {
    return (
      <div className="text-red-500 w-screen text-center text-2xl">
        Error: {error}
      </div>
    );
  }

  if (!board) {
    return <div className="text-white"><Loader /> </div>;
  }

  return (
    <>
      <BoardHeader board={board.title} />
      <div className="flex h-full w-full gap-3 overflow-x-scroll py-10 px-5">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDropEnd}>
          {board.columns.map((column) => (
            <Column key={column.id} title={column.title} columnID={column.id} />
          ))}
        </DndContext>
        <AddColumnButton onAdd={addColumn} />
      </div>
    </>
  );
};