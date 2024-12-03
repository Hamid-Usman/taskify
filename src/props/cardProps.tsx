import { Dispatch, SetStateAction } from "react";
import { CardType, ColumnType } from "./cardColumn";
export type AddCardProps = {
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};