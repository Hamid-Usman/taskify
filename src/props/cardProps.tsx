import { Dispatch, SetStateAction } from "react";
import { CardType, ColumnType } from "./cardColumn";
export interface AddCardProps {
    column: ColumnType;
    onAdd: (newCard: CardType) => void;
}