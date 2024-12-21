import { useState } from "react";
import { FiPlus } from "react-icons/fi";
export const AddColumnButton = ({ onAdd }: { onAdd: (title: string) => void }) => {
    const [newColumnTitle, setNewColumnTitle] = useState<string>("");
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddColumn = async () => {
        if (!newColumnTitle.trim()) return;
    
        try {
            onAdd(newColumnTitle.trim());
            setNewColumnTitle(""); // Clear the input after adding the column
            setIsAdding(false); // Hide the input form
        } catch (err) {
            console.error("Error adding column:", err);
            setError((err as Error).message || "An unexpected error occurred");
        }
    };

    return (
      <div className="">
        {isAdding ? (
          <div className="w-[240px] bg-black px-4 py-2 rounded-md">
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="New column title"
              className="w-full rounded text-primary border-primary_low border p-2 focus:outline-primary focus:outline-none bg-primary_low text-sm"
            />
            <div className="mt-1.5 flex items-center justify-end gap-1.5">
              <button
                onClick={handleAddColumn}
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Add Column</span>
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
              >
                <span>Cancel</span>
              </button>
            </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex w-[240px] items-center gap-1.5 rounded bg-neutral-50 px-3 py-2 text-neutral-950 transition-colors bg-black"
        >
          <span className="flex items-center gap-2">Add New Column 
                      <FiPlus /></span>
        </button>
      )}
    </div>
  );
};