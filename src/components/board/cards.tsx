import { motion } from "framer-motion";
import { DropIndicator } from "./utils/dropIndicator";
import { CardProps } from "./columns";
export const Card = ({ title, id, column, handleDragStart }: CardProps) => {
    return (
    <>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        whileDrag={{ backgroundColor: 'var(--bg-accent-low)' }}
        className="cursor-grab rounded border border-neutral-70 p-3 active:cursor-grabbing"
        >
        <p className="text-sm text-neutral-100">{title}</p>
        </motion.div>
    </>
    );
};
