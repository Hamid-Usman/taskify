import { FormEvent, useEffect, useState } from "react";
//import { CardType, ColumnType } from "../../props/cardColumn";
import { CardType } from "../../props/cardColumn";
import { BoardInput } from "./boardInput";
import { Card } from "./cards";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useDroppable } from "@dnd-kit/core";

type ColumnProps = {
  title: string;
  columnID: number;
};


const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("authToken");

export const Column = ({ title, columnID }: ColumnProps) => {
  const {setNodeRef} = useDroppable ({
    id: columnID.toString()
  })
  const [cards, setCards] = useState<CardType[]>([]);
  const [columnTitle, setColumnTitle] = useState(title);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  //const [columnData, setColumnData] = useState<ColumnType | null>(null);
  const [newCardText, setNewCardText] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  
  
  const fetchCards = async (columnID: number) => {
    try {
      const response = await fetch(`${apiUrl}/columns/${columnID}/cards/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${token}`,
            },
        });
      if (!response.ok) {
        throw new Error(`Failed to fetch cards. Status: ${response.status}`);
      }
      const data = await response.json();
      setCards(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError((err as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchColumnData = async (columnID: number) => {
    try {
      const response = await fetch(`${apiUrl}/columns/${columnID}/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        }
    });
      if (!response.ok) {
        throw new Error(`Failed to fetch column data. Status: ${response.status}`);
      }
      //const data = await response.json();
      //setColumnData(data);
    } catch (err) {
      console.error("Error fetching column data:", err);
      setError((err as Error).message || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (!columnID || columnID <= 0) {
      setError("Invalid column ID");
      setLoading(false);
      return;
    }

    setLoading(true); // Reset loading state
    fetchCards(columnID);
    fetchColumnData(columnID);
  }, [columnID]);

  const handleTitleSave = async (newTitle: string) => {
    try {
      const response = await fetch(`${apiUrl}/columns/${columnID}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
          title: newTitle, // Use the newTitle parameter here
        }),
      });

      if (!response.ok) {
        throw new Error("Couldn't change title");
      }

      // Update the local state with the new title after a successful response
      setColumnTitle(newTitle);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred");
    }
  };



  const addCard = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newCardText.trim()) return;
      setIsAdding(true);
      try {
          const response = await fetch(`${apiUrl}/cards/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  "Authorization": `Token ${token}`,
                  },
        
              body: JSON.stringify({ task: newCardText.trim(), column: columnID }),
          });
          if (!response.ok) throw new Error("Failed to add card");
          const addedCard = await response.json();
          setCards((prev) => [...prev, addedCard]);
          setNewCardText("");
      } catch (err) {
          console.error("Error adding card:", err);
          setError((err as Error).message || "An unexpected error occurred");
      } finally {
          setIsAdding(false);
      }
  };

  return (
    <div className="shrink-0">
      {/* Column Title Input */}
      <div className="mb-3 flex items-center justify-between">
        <BoardInput
          initialTitle={columnTitle}
          onSave={(newTitle) => {
            handleTitleSave(newTitle);
            setColumnTitle(newTitle);
          }}
        />
      </div>



      {/* Cards Container */}
      <div className="min-h-fit mb-2 bg-black p-3 rounded-md w-[240px] transition-colors flex flex-col gap-2"
        ref={setNodeRef}
      >
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">
            {`Error: ${error}`}
            <button
              className="ml-2 text-blue-500 underline"
              onClick={() => fetchCards(columnID)}
            >
              Retry
            </button>
          </div>
        ) : cards.length >  0 ? (
          cards.map((card) => <Card key={card.id} card={card} columnID={card.column} />)
        ) : (
          <div>No cards available</div>
        )}
        
      {isAdding ? (
        
        <form onSubmit={addCard} className="mt-2">
        <textarea
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Add new task..."
          className="w-full h-14 rounded text-primary border-primary_low border px-2 focus:outline-primary focus:outline-none bg-primary_low text-sm"
        />
        <div className="mt-1.5 flex items-center justify-end gap-1.5">
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
          >
            Add
          </button>
          
          <button
            onClick={() => setIsAdding(false)}
            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
          >
            <span>Cancel</span>
          </button>
        </div>
      </form>
        ): (
          <>
          
          <motion.button
            onClick={() => setIsAdding(true)}
            className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors rounded-md hover:bg-secondary hover:text-neutral-50"
          >
            <span>Add card</span>
            <FiPlus />
          </motion.button>
          </>
          )
  
        }
      </div>
    </div>
  );
};
