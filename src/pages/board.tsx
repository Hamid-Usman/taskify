import { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { BoardHeader } from "../components/header/boardHeader";
import { ColumnType} from "../props/cardColumn";
import { DndContext } from "@dnd-kit/core";
import { Column } from "../components/board/columns";
import { AddColumnButton } from "../components/board/addColumn";




    export const CustomKanban = () => {
        return (
            <>
                <Header />
                <BoardHeader />
                
                <div className="h-screen w-full pt-20 text-neutral-50">
                    <Board />
                </div>
            </>
        );
    };
    
    const Board = () => {
    const [columns, setColumns] = useState<ColumnType[]>([]);
    const [error, setError] = useState<string | null>(null);

    const addColumn = async (title: string) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/columns/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, order: columns.length }),
            });
    
            if (!response.ok) {
            throw new Error("Failed to add column");
            }
    
            const newColumn = await response.json();
            setColumns((prevColumns) => [...prevColumns, newColumn]);
        } catch (err) {
            console.error("Error adding column:", err);
            setError((err as Error).message || "An unexpected error occurred");
        }
        };

        useEffect(() => {
            const fetchColumns = async () => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/columns/');
                    if (!response.ok) {
                        throw new Error("Couldn't fetch columns")
                    };
                    const data = await response.json();
                    setColumns(data)
                }

                catch(err: unknown) {
                    setError((err as Error).message);
                }
            };
            fetchColumns()
        }, []);

        return (
        <div className="flex h-full w-full gap-3 overflow-x-scroll py-10 px-5">
            <DndContext
                >
                {columns.map((column) => (
                    <Column
                    key={column.id}
                    title={column.title}
                    columnID={column.id}
                    />
            ))}
            </DndContext>
            {error && <>error here</>}
            
            <AddColumnButton onAdd={addColumn} />
        </div>
        );
    };
    



    
    

