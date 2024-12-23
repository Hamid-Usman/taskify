import React from "react";

interface BoardProp {
    board: string;
}
export const BoardHeader: React.FC<BoardProp> = ({ board }) => {
    return (
        
        <div className="bg-accent_low fixed w-full h-14 top-12
            flex items-center px-5
            text-xl md:text-2xl font-bold">
                {board}
        </div>
    )
}