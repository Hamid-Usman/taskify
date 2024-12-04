
import { CardType } from "../props/cardColumn"
import Backdrop from "./backdrop";

export interface CardTypeProp {
    closeModal: ()=> void;
    card: CardType;
}

export const CardModal: React.FC<CardTypeProp> = ({closeModal, card}) => {
    
    return(
        <Backdrop
            onClick={closeModal}>
                <div
                    onClick={(e)=>e.stopPropagation()}
                    className="">
                        
                    <p className="p-5">{card.title} </p>

                </div>

        </Backdrop>
    )
}