
import { CardType } from "../props/cardColumn"
import Backdrop from "./backdrop";
import { MdOutlineSubtitles } from "react-icons/md";
import { Textarea } from "../components/ui/textarea"
import { MdDeleteForever } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/buttons/button";

export interface CardTypeProp {
    closeModal: ()=> void;
    card: CardType;
}

export const CardModal: React.FC<CardTypeProp> = ({closeModal, card}) => {
    const [dueDate, setDueDate] = useState<string>(card.due_date)
    const [description, setDescription] = useState<string>(card.description)
    const [task, setTask] = useState<string>(card.task)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(false)
        setTask(e.target.value)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(false);
        setDueDate(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLoading(false);
        setDescription(e.target.value);
    }

    const handleSave = async () => {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/cards/${card.id}/`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    due_date: dueDate,
                    description
                })
            })
            if (!response.ok) {
                throw new Error('Failed to update card')
            }
            const update = response.json()
            console.log(update)

        }
        catch(err) {
            setError((err as Error).message || "An unexpected error occurred");
        }
    }
    
    return(
        <Backdrop
            onClick={closeModal}>
                <motion.div
                    drag={true}
                    onClick={(e)=>e.stopPropagation()}
                    className="w-[95%] md:w-[80%] lg:w-[50%] h-fit rounded-xl p-3 px-5 mx:px-7 bg-secondary
                        flex gap-4 flex-col z-[3]">
                        <div className="flex  gap-3 sm:items-center">
                            <MdOutlineSubtitles 
                                size='25'/>
                            <div className="text-lg md:text-xl font-bold flex ">
                                <label htmlFor="" className="flex flex-col md:flex-row  md:items-center gap-2 ">
                                    <h1 className="flex gap-2">
                                        {card.task}
                                    </h1>
                                    
                                    <span>
                                        <MdDeleteForever />
                                    </span>
                                </label>
                            </div>
                        </div>
                        <section className="flex flex-col gap-5 mt-5">
                            <div className="flex gap-4">
                                <SlCalender 
                                    size={25}
                                />
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={handleDateChange}
                                    className={`w-fit px-2 rounded ${
                                        new Date(dueDate).toDateString() <= new Date().toDateString()
                                            ? 'bg-[#DC143C] text-white'
                                            : 'bg-accent_low text-accent'
                                    }`}
                                />
                            </div>
                            <Textarea 
                                value={description}
                                onChange={handleDescriptionChange}
                                heading="Description"
                                icon={<GiNotebook
                                    size={25}/>}
                                />
                        </section>
                        <div className="ml-10">
                            
                        <Button
                            onClick={handleSave}
                            classname={loading ? "bg-accent_low text-gray" : ""}
                        >
                        {loading ? "Saved..." : "Save"}

                        </Button>
                        </div>
                </motion.div>

        </Backdrop>
    )
}