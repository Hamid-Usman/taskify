export type ColumnType = "backlog" | "todo" | "in progress" | "done";

export type CardType = {
    title: string;
    id: string;
    column: ColumnType;
};