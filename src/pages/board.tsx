    import {
        Dispatch,
        SetStateAction,
        useState,
        DragEvent,
        FormEvent,
    } from "react";
    import { FiPlus, FiTrash } from "react-icons/fi";
    import { motion } from "framer-motion";
    import { FaFire } from "react-icons/fa";
    import { Header } from "../components/header/header";
    import { BoardHeader } from "../components/header/boardHeader";
import { CardType } from "../props/cardColumn";
import { Column } from "../components/board/columns";
import { AddCardProps } from "../props/cardProps";
import { DEFAULT_CARDS } from "../data/cards";
    
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
        const [cards, setCards] = useState(DEFAULT_CARDS);
    
        return (
        <div className="flex h-full w-full gap-3 overflow-x-scroll py-10 px-5">
            <Column
            title="Backlog"
            column="backlog"
            headingColor="text-neutral-500"
            cards={cards}
            setCards={setCards}
            />
            <Column
            title="TODO"
            column="todo"
            headingColor="text-yellow-200"
            cards={cards}
            setCards={setCards}
            />
            <Column
            title="WIP"
            column="in progress"
            headingColor="text-blue-200"
            cards={cards}
            setCards={setCards}
            />
            <Column
            title="Complete"
            column="done"
            headingColor="text-emerald-200"
            cards={cards}
            setCards={setCards}
            />
            <BurnBarrel setCards={setCards} />
        </div>
        );
    };
    


    
    
    const BurnBarrel = ({
        setCards,
    }: {
        setCards: Dispatch<SetStateAction<CardType[]>>;
    }) => {
        const [active, setActive] = useState(false);
    
        const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
        };
    
        const handleDragLeave = () => {
        setActive(false);
        };
    
        const handleDragEnd = (e: DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId");
    
        setCards((pv) => pv.filter((c) => c.id !== cardId));
    
        setActive(false);
        };
    
        return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
            active
                ? "border-red-800 bg-red-800/20 text-red-500"
                : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
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
            column,
            title: text.trim(),
            id: Math.random().toString(),
        };
    
        setCards((pv) => [...pv, newCard]);
    
        setAdding(false);
        };
    
        return (
        <div className="mt-2">
            {adding ? (
            <motion.form className="" layout onSubmit={handleSubmit}>
                <textarea
                onChange={(e) => setText(e.target.value)}
                autoFocus
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
                layout
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
    
    