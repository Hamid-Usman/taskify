import React, { useEffect, useState } from "react";
import { Card } from "./cards";
import { CardType } from "../../props/cardColumn";

const CardsList: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`${apiUrl}/cards/`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${token}`,
            },
          });
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        setCards(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardsList;
