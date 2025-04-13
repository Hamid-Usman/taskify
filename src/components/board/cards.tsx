import { useState } from "react";
import { CardType } from "../../props/cardColumn";
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { CardModal } from "../../modals/cardModal";

interface CardProp {
  card: CardType;
  columnID: number; // Pass the columnID for proper drag/drop handling
}

export const Card = ({ card }: CardProp) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id.toString(),
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        backgroundColor: isDragging ? "var(--primary)" : "",
      }
    : undefined;

  return (
    <div className="rounded">
      <motion.div
        onClick={openModal}
        ref={setNodeRef} // Attach draggable node
        {...listeners} // Add drag listeners (dragging events)
        {...attributes} // Add necessary drag attributes (e.g., role, aria)
        key={card.id}
        className={clsx(
          "p-3 active:cursor-grabbing transition-colors duration-200 rounded-lg",
          isDragging && "rotate-45 opacity-50 bg-gray-200",
          card.priority === "high" && "border-2 border-red-500",
          card.priority === "medium" && "border-2 border-yellow-500",
          card.priority === "low" && "border-2 border-green-500",
          card.priority === "backlog" && "border-2 border-primary bg-primary_low"
        )}
        style={{ touchAction: "none", ...style }} // Apply styles dynamically
      >
        <p className="font-bold">{card.task}</p>
        <p className="text-sm text-gray-500">Due: {new Date(card.due_date).toLocaleDateString()}</p>
      </motion.div>

      {/* Modal to show card details */}
      {modalOpen && <CardModal closeModal={closeModal} card={card} />}
    </div>
  );
};
