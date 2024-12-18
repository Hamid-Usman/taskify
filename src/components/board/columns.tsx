import { useEffect, useState } from "react";
import { CardType } from "../../props/cardColumn";
import { BoardInput } from "./boardInput";
import { Card } from "./cards";

type ColumnProps = {
  title: string;
  columnID: number;
};

export const Column = ({ title, columnID }: ColumnProps) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [columnTitle, setColumnTitle] = useState(title);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async (columnID: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/columns/${columnID}/cards/`);
      if (!response.ok) {
        throw new Error(`Failed to fetch cards. Status: ${response.status}`);
      }
      const data = await response.json();
      setCards(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching cards:", err);
      setError((err as Error).message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (!columnID || columnID <= 0) {
      setError("Invalid column ID");
      setLoading(false);
      return;
    }

    setLoading(true); // Reset loading state
    fetchCards(columnID);
  }, [columnID]);

  const handleTitleSave = (newTitle: string) => {
    setColumnTitle(newTitle);
  };

  return (
    <div className="shrink-0">
      {/* Column Title Input */}
      <div className="mb-3 flex items-center justify-between">
        <BoardInput initialTitle={columnTitle} onSave={handleTitleSave} />
      </div>

      {/* Cards Container */}
      <div className="min-h-fit bg-[#010B13] p-3 rounded-md w-[240px] transition-colors flex flex-col gap-2">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">
            {`Error: ${error}`}
            <button
              className="ml-2 text-blue-500 underline"
              onClick={() => fetchCards(columnID)}
            >
              Retry
            </button>
          </div>
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.id} card={card} />
          ))
        ) : (
          <div>No cards available</div>
        )}
      </div>
    </div>
  );
};
