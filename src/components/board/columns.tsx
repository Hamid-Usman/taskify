import { Dispatch, SetStateAction, useState } from "react";
import { CardType, ColumnType } from "../../props/cardColumn";
import { BoardInput } from "./boardInput";
import { DropIndicator } from "./utils/dropIndicator";
import { Card } from "./cards";
import { AddCard } from "../../pages/board";


type ColumnProps = {
    title: string;
    headingColor: string;
    cards: CardType[];
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

export const Column = ({
    title,
    cards,
    column,
    setCards,
}: ColumnProps) => {
    const [active, setActive] = useState(false);
    const [columnTitle, setColumnTitle] = useState(title)
    const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
// Type guards
const isReactDragEvent = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
): e is React.DragEvent<HTMLDivElement> => {
    return 'dataTransfer' in e;
};

const isReactTouchEvent = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
): e is React.TouchEvent<HTMLDivElement> => {
    return 'touches' in e;
};

// Card title update
const handleTitleSave = (newTitle: string) => {
    setColumnTitle(newTitle);
};

// Handle drag start
const handleDragStart = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardType
) => {
    if (isReactDragEvent(e)) {
        e.dataTransfer?.setData('cardId', card.id);
    } else if (isReactTouchEvent(e)) {
        setDraggedCardId(card.id);
    }
    console.log('Card pulled...');
};

// Handle drag end
const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
    let cardId = '';

    if (isReactDragEvent(e)) {
        cardId = e.dataTransfer?.getData('cardId') || '';
    } else if (isReactTouchEvent(e)) {
        cardId = draggedCardId || '';
        setDraggedCardId(null);
    }

    if (!cardId) return;

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';

    if (before !== cardId) {
        let copy = [...cards];

        let cardToTransfer = copy.find((c) => c.id === cardId);
        if (!cardToTransfer) return;
        cardToTransfer = { ...cardToTransfer, column };

        copy = copy.filter((c) => c.id !== cardId);

        const moveToBack = before === '-1';

        if (moveToBack) {
            copy.push(cardToTransfer);
        } else {
            const insertAtIndex = copy.findIndex((el) => el.id === before);
            if (insertAtIndex === undefined) return;

            copy.splice(insertAtIndex, 0, cardToTransfer);
        }

        setCards(copy);
    }
    console.log('Card placed');
};

// Handle drag over
const handleDragOver = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
    e.preventDefault();

    if (isReactDragEvent(e)) {
        highlightIndicator(e);
        setActive(true);
    } else if (isReactTouchEvent(e)) {
        const touch = e.touches[0];
        highlightIndicator({
            clientX: touch.clientX,
            clientY: touch.clientY,
        } as React.DragEvent<HTMLDivElement>);
    }
};

// Clear highlights
const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
        i.style.opacity = '0';
    });
};

// Highlight indicator
const highlightIndicator = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = '1';
};

// Get nearest indicator
const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    indicators: HTMLElement[]
) => {
    const DISTANCE_OFFSET = 50;

    let clientY: number;

    if (isReactDragEvent(e)) {
        clientY = e.clientY;
    } else if (isReactTouchEvent(e)) {
        const touch = e.touches[0];
        clientY = touch.clientY;
    } else {
        return {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        };
    }

    const el = indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = clientY - (box.top + DISTANCE_OFFSET);

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        }
    );

    return el;
};

// Get indicators
const getIndicators = () => {
    return Array.from(
        document.querySelectorAll(
            `[data-column="${column}"]`
        ) as unknown as HTMLElement[]
    );
};

// Handle drag leave
const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
};

// Filter cards
const filteredCards = cards.filter((c) => c.column === column);

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
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`min-h-fit bg-[#010B13] p-3 rounded-md w-[240px] transition-colors ${
            active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
        >
        {filteredCards.map((c) => {
            return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
        </div>
    </div>
    );
};

export type CardProps = CardType & {
    handleDragStart: Function;
};
