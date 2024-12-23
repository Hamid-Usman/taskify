import { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { BoardHeader } from "../components/header/boardHeader";
import { ColumnType} from "../props/cardColumn";
import { DndContext } from "@dnd-kit/core";
import { Column } from "../components/board/columns";
import { AddColumnButton } from "../components/board/addColumn";
import { useParams } from "react-router-dom";


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


    const addColumn = async (title: string) => {
    if(!token) {
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

    useEffect(() => {
        const fetchBoard = async () => {

            if(!token) {
                console.error("No token provided");
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

    if (error) {
        return (
            <div className="text-red-500  w-screen text-center text-2xl">
                Error: {error}
            </div>
        );
    }

    if (!board) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <>
            <BoardHeader board={board.title} />
            <div className="flex h-full w-full gap-3 overflow-x-scroll py-10 px-5">
                <DndContext
                    >
                    {board.columns.map((column) => (
                        <Column
                        key={column.id}
                        title={column.title}
                        columnID={column.id}
                        />
                ))}
                </DndContext>
                {error && <>error here</>}

                {/* Add column button */}
                <AddColumnButton onAdd={addColumn} />
            </div>
        </>
    );
};
