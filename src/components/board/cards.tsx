import { useState } from "react";
import { CardType } from "../../props/cardColumn";
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { CardModal } from "../../modals/cardModal";

interface CardProp {
  card: CardType;
}

export const Card = ({ card }: CardProp) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id.toString(), // Convert id to string for compatibility
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        backgroundColor: isDragging ? "var(--primary)" : "var(--accent)", // Ensure CSS vars are defined
      }
    : undefined;

  return (
    <div className="rounded">
      <motion.div
        onClick={openModal}
        key={card.id}
        className={clsx(
          "p-3 active:cursor-grabbing transition-colors duration-200 rounded-lg",
          isDragging ? "rotate-45 opacity-50 bg-gray-200" : "bg-secondary shadow"
        )}
        style={{ touchAction: "none", ...style }}
      >
        <p className="font-bold">{card.task}</p>
        <p className="text-sm text-gray-500">Due: {new Date(card.due_date).toLocaleDateString()}</p>
      </motion.div>

      {!isDragging && (
        <button
          className="bg-blue-500 text-white py-1 w-full rounded-sm mt-2 hover:bg-blue-600"
          onClick={openModal}
        >
          Expand
        </button>
      )}

      {modalOpen && <CardModal closeModal={closeModal} card={card} />}
    </div>
  );
};
