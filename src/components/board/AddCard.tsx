import React, { useState, FormEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface AddCardProps {
  column: ColumnType;
  onAdd: (newCard: CardType) => void;
}

interface CardType {
  id: number;
  task: string;
  position: number;
  description: string;
  due_date: string;
  column: string;
}

interface ColumnType {
  id: string;
  title: string;
}

export const AddCard: React.FC<AddCardProps> = ({ column, onAdd }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: CardType = {
      id: Math.random(),  // You can replace this with a proper ID if needed
      task: text.trim(),
      position: 0,  // Set a default or dynamic value based on your needs
      description: "",  // Set a default or dynamic value based on your needs
      due_date: "",  // Set a default or dynamic value based on your needs
      column: column.id,
    };

    onAdd(newCard);

    setAdding(false);
    setText(""); // Clear the input after adding the card
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

export default AddCard;