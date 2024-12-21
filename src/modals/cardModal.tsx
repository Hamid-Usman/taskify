import { useState } from "react";
import { CardType } from "../props/cardColumn";
import Backdrop from "./backdrop";
import { MdOutlineSubtitles, MdDeleteForever } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { motion } from "framer-motion";
import { Button } from "../components/buttons/button";
import { Textarea } from "../components/ui/textarea";

export interface CardTypeProp {
    closeModal: () => void;
    card: CardType;
}

export const CardModal: React.FC<CardTypeProp> = ({ closeModal, card }) => {
    const [dueDate, setDueDate] = useState<string>(card.due_date);
    const [description, setDescription] = useState<string>(card.description);
    const [task, setTask] = useState<string>(card.task);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEditing] = useState<boolean>(false);
    
    const openEdit = () => setEditing(true)
    const closeEdit = () => setEditing(false)

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/cards/${card.id}/`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    due_date: dueDate,
                    description: description,
                    task: task, // Send updated task if needed
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update card');
            }
            console.log("Updated!");
            closeModal(); // Close the modal on success
        } catch (err) {
            setError((err as Error).message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Backdrop onClick={closeModal}>
            <motion.div
                drag={true}
                onClick={(e) => e.stopPropagation()}
                className="w-[95%] md:w-[80%] lg:w-[50%] h-fit rounded-xl p-3 px-5 mx:px-7 bg-secondary flex gap-4 flex-col z-[3]"
            >
                <div className="flex gap-3 sm:items-center">
                    <MdOutlineSubtitles size="25" />
                    <div className="text-lg md:text-xl font-bold flex">
                        <label htmlFor="" className="flex flex-col md:flex-row md:items-center gap-2">
                            {edit ? (
                                <input
                                    type="text"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    className="p-2 bg-accent_low rounded-lg"
                                />
                            ) : (
                                <p>{task}</p>
                            )}
                            <span>
                                <MdDeleteForever />
                            </span>
                        </label>
                    </div>
                </div>
                <section className="flex flex-col gap-5 mt-5">
                    <div className="flex gap-4">
                        <SlCalender size={25} />
                        {edit ? (
                            <input
                                type="date"
                                value={dueDate}
                                onChange={handleDateChange}
                                className="p-2 bg-accent_low rounded-lg"
                            />
                        ) : (
                            <p>{dueDate}</p>
                        )}
                    </div>
                    <div className="flex gap-4">
                        
                        <GiNotebook size={25} />
                        {edit ? (
                        <Textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            heading="Description"
                        />
                            ) : (
                            <p>{description}</p>
                            )
                        }
                    </div>
                </section>
                {error && <p className="text-red-600">{error}</p>}
                <div className="ml-10 flex gap-2">
                    <Button onClick={handleSave} classname={!loading ? "bg-primary text-secondary" : ""}>
                        {loading ? "Saved..." : "Save"}
                    </Button>
                    {!edit ? (
                        
                        <Button onClick={openEdit} classname={"bg-accent_low text-white"}>
                            Edit
                        </Button>
                        ) : (
                        <Button onClick={closeEdit} classname={"bg-accent_low text-white"}>
                            Cancel
                        </Button>
                    )}
                </div>
            </motion.div>
        </Backdrop>
    );
};
