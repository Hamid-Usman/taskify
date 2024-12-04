import { motion } from "framer-motion";
import { DropIndicator } from "./utils/dropIndicator";
import { CardType } from "../../props/cardColumn";
import { useDraggable } from "@dnd-kit/core";
import clsx from "clsx";


export const Card = ({ title, id, status }: CardType) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: id,
    });
    
    const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        backgroundColor:  isDragging ? "primary" : "accent"
        
        }
    : undefined;
    return (
    <>
        <DropIndicator beforeId={id} column={status} />
        <motion.div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        draggable="true"
        className={clsx(
            "cursor-grab rounded border border-neutral-70 p-3 active:cursor-grabbing transition-colors duration-200",
            isDragging ? "opacity-50, bg-secondary": "placeholder-opacity-100" // Replace colors with Tailwind classes
        )}
        style={{touchAction: "none", ...style}}
        >
        <p className="text-sm text-neutral-100">{title}</p>
        </motion.div>
    </>
    );
};
