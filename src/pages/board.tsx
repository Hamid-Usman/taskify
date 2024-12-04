import { FormEvent, useState } from "react";
import { Header } from "../components/header/header";
import { BoardHeader } from "../components/header/boardHeader";
import { CardType, column as columns} from "../props/cardColumn";
import { Column } from "../components/board/columns";
import { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { AddCardProps } from "../props/cardProps";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";


const COLUMNS: columns[] = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];


export const DEFAULT_CARDS: CardType[] = [
    // BACKLOG
    { title: "Keep going down", id: "1", status: "backlog" },
    { title: "Pray", id: "2", status: "in progress" },
    { title: "Skywalking", id: "4", status: "backlog" },
    { title: 'Make the cards draggable for Halimah🌚', id: "5", status: "done" },
    // TODO
    {
    title: "Build PG's landing page",
    id: "6",
    status: "todo",
    },

    // DOING
    {
    title: "Refactor context providers to use Zustand",
    id: "8",
    status: "in progress",
    },
    { title: "50 pushups", id: "3", status: "done" },
    // DONE
    {
    title: "Survive the day",
    id: "10",
    status: "done",
    },
];

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
        const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS);
        const [columns, setColumns] = useState(COLUMNS); // Track column order
        function handleDragEnd(event: DragEndEvent) {
            const { active, over } = event;
        
            if (!over) return;
        
            const taskId = active.id as string;
            const newStatus = over.id as CardType["status"];
        
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === taskId ? { ...card, status: newStatus } : card
                )
                );
                
            if (active.data.current?.type === 'column' && over.data.current?.type === 'column') {
                const activeIndex = columns.findIndex((col) => col.id === active.id);
                const overIndex = columns.findIndex((col) => col.id === over.id);
    
                // Swap columns if the index is different
                if (activeIndex !== overIndex) {
                    const updatedColumns = [...columns];
                    const [movedColumn] = updatedColumns.splice(activeIndex, 1);
                    updatedColumns.splice(overIndex, 0, movedColumn);
                    setColumns(updatedColumns); // Update column order
                }
            }
            }
        
    
        return (
        <div className="flex h-full w-full gap-3 overflow-x-scroll py-10 px-5">
            <DndContext
                onDragEnd={handleDragEnd}>
                {COLUMNS.map((column) => (
                    <Column
                    key={column.id}
                    title={column.title}
                    column={column.id}
                    cards={cards.filter((card) => card.status === column.id)}
                    setCards={setCards}
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