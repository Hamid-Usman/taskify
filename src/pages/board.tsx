import { FormEvent, useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { BoardHeader } from "../components/header/boardHeader";
import { ColumnType} from "../props/cardColumn";
import { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { AddCardProps } from "../props/cardProps";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Column } from "../components/board/columns";




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
        //const [cards, setCards] = useState<CardType[]>();
        const [columns, setColumns] = useState<ColumnType[]>([]);
        const [error, setError] = useState<string | null>(null);

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

        function handleDragEnd(event: DragEndEvent) {
            const { active, over } = event;
        
            if (!over) return;
        
            const taskId = active.id as string;
        
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === taskId ? { ...card } : card
                )
                );
            }
        
    
        return (
        <div className="flex h-full w-full gap-3 overflow-x-scroll py-10 px-5">
            <DndContext
                onDragEnd={handleDragEnd}>
                {columns.map((column) => (
                    <Column
                    key={column.id}
                    title={column.title}
                    columnID={column.id}
                    />
            ))}
            </DndContext>
        </div>
        );
    };
    


    
    

    export const AddCard = ({ column, setCards }: AddCardProps) => {
        const [text, setText] = useState("");
        const [adding, setAdding] = useState(false);
    
        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            if (!text.trim().length) return;
    
            const newCard = {
                status: column,
                title: text.trim(),
                id: Math.random().toString(),
            };
    
            setCards((pv) => [...pv, newCard]);
    
            setAdding(false);
        };
    
        return (
            <div className="mt-2">
                {adding ? (
                    <motion.form layout onSubmit={handleSubmit}>
                        <textarea
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Add new task..."
                            className="w-full h-14 rounded text-primary border-primary_low border px-2 focus:outline-primary focus:outline-none bg-primary_low text-sm"
                        />
                        <div className="mt-1.5 flex items-center justify-end gap-1.5">
                            <button
                                onClick={() => setAdding(false)}
                                className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                            >
                                <span>Add</span>
                                <FiPlus />
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.button
                        onClick={() => setAdding(true)}
                        className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors rounded-md hover:bg-secondary hover:text-neutral-50"
                    >
                        <span>Add card</span>
                        <FiPlus />
                    </motion.button>
                )}
            </div>
        );
    };