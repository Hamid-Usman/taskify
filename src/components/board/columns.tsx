import { useState } from "react";
import { CardType, ColumnType } from "../../props/cardColumn";
import { BoardInput } from "./boardInput";
import { DropIndicator } from "./utils/dropIndicator";
import { Card } from "./cards";
import { useDroppable } from "@dnd-kit/core";
import { AddCard } from "../../pages/board";

// where I am to fetch the data from the API
type ColumnProps = {
    title: string;
    cards: CardType[];
    column: ColumnType;
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export const Column = ({
    title,
    cards,
    column,
    setCards,
}: ColumnProps) => {
    const {setNodeRef} = useDroppable({
        id: column
    })
    const [columnTitle, setColumnTitle] = useState(title)


    // Card title update
    const handleTitleSave = (newTitle: string) => {
        setColumnTitle(newTitle);
    };

// Filter cards
    const filteredCards = cards.filter((c) => c.status === column);

    return (
    <div className=" shrink-0">
        <div className="mb-3 flex items-center justify-between">
        <BoardInput initialTitle={columnTitle} onSave={(handleTitleSave)}/>
        {/* 
        <span className="rounded text-sm text-neutral-400">
            {filteredCards.length}
        </span>*/}
        </div>
        <div
        ref={setNodeRef}
        className={`min-h-fit bg-[#010B13] p-3 rounded-md w-[240px] transition-colors`}
        >
            {filteredCards.map((card) =>{
                return <Card key={card.id} {...card}/>;
            })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
        </div>
    </div>
    );
};

