
export type ColumnType = {
    id: number;
    title: string;
    order: number;
    cards: CardType[];
};

export type CardType = {
    id: number;
    task: string;
    position: number;
    description: string;
    due_date: string;
    column: number;
    priority: string;
};