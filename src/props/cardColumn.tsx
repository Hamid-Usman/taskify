export type ColumnType = "backlog" | "todo" | "in progress" | "done";

export type column = {
    id: ColumnType;
    title: string;
};
export type CardType = {
    title: string;
    id: string;
    status: ColumnType;
};