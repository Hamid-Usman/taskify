import { motion } from "framer-motion";
import { DropIndicator } from "./utils/dropIndicator";
import { CardType } from "../../props/cardColumn";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { useState } from "react";
import { CardModal } from "../../modals/cardModal";

interface CardProp {
    card: CardType;
}

export const Card = ({ card }: CardProp) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: card.id,
    });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
              backgroundColor: isDragging ? "primary" : "accent",
          }
        : undefined;

    return (
        <div className="rounded">
            <DropIndicator beforeId={card.id} column={card.status} />
            
            <motion.div
                key={card.id}
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                draggable="true"
                className={clsx(
                    " border-neutral-70 p-3 active:cursor-grabbing transition-colors duration-200",
                    isDragging ? "rotate-45 opacity-50, bg-accent_low" : "placeholder-opacity-100" // Replace colors with Tailwind classes
                )}
                style={{ touchAction: "none", ...style }}
            >
                <p className="">{card.title}</p>

            </motion.div>
            <button
                onClick={openModal}
                className={clsx(
                    "bg-accent_low py-1 w-full rounded-sm",
                isDragging? "hidden": "block"
                )}>Expand</button>

            {modalOpen && (
                <CardModal closeModal={closeModal} card={card} />
            )}
        </div>
    );
};
