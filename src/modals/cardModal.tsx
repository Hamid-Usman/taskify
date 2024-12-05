
import { CardType } from "../props/cardColumn"
import Backdrop from "./backdrop";
import { MdOutlineSubtitles } from "react-icons/md";
import { Textarea } from "../components/ui/textarea"
import { MdDeleteForever } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";

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
                    className="w-[95%] md:w-[80%] lg:w-[50%] h-fit rounded-xl p-3 px-5 mx:px-7 bg-secondary
                        flex gap-4 flex-col z-[3]">
                        <div className="flex  gap-3 sm:items-center">
                            <MdOutlineSubtitles 
                                size='25'/>
                            <div className="text-lg md:text-xl font-bold flex ">
                                <label htmlFor="" className="flex flex-col md:flex-row  md:items-center gap-2 ">
                                    <h1 className="flex gap-2">
                                        {card.title}
                                    </h1>
                                    
                                    <span
                                            className="px-1 text-[14px] w-max h-max bg-accent_low rounded">{card.status}
                                        </span>
                                    
                                        <span>
                                            <MdDeleteForever />
                                        </span>
                                </label>
                            </div>
                        </div>
                        <section className="flex flex-col gap-5 mt-5">
                        <p className="px-10">(Input fields not functional yet)</p>
                            <Textarea 
                                heading="Description"
                                icon={<GiNotebook
                                    size={25}/>}
                                />
                        </section>
                            
                        

                </div>

        </Backdrop>
    )
}