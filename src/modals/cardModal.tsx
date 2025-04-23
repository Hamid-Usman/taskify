import { useState } from "react";
import { CardType } from "../props/cardColumn";
import Backdrop from "./backdrop";
import { MdOutlineSubtitles, MdDeleteForever, MdPriorityHigh } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { motion } from "framer-motion";
import { Button } from "../components/buttons/button";
import { Textarea } from "../components/ui/textarea";

export interface CardTypeProp {
    closeModal: () => void;
    card: CardType;
}

export const CardModal: React.FC<CardTypeProp> = ({ closeModal, card}) => {
    const [cardData, setCardData] = useState<CardType>(card);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEditing] = useState<boolean>(false);
    
    const token = localStorage.getItem("authToken");
    const apiUrl = import.meta.env.VITE_API_URL;

    const openEdit = () => setEditing(true)
    const closeEdit = () => setEditing(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCardData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/cards/${card.id}/`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
                body: JSON.stringify({
                    due_date: cardData.due_date,
                    description: cardData.description,
                    task: cardData.task,
                    priority: cardData.priority,
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

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/cards/${card.id}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete card');
            }
            console.log("Deleted!");
            closeModal(); // Close the modal on success
        } catch (err) {
            setError((err as Error).message || "An unexpected error occurred");
        } finally {
            setLoading(false);

        }
    }

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
                                    name="task"
                                    value={cardData.task}
                                    onChange={handleChange}
                                    className="p-2 bg-accent_low rounded-lg"
                                />
                            ) : (
                                <p>{cardData.task}</p>
                            )}
                            <span onClick={handleDelete} className="cursor-pointer hover:text-primary transition duration-300">
                                <MdDeleteForever />
                            </span>
                        </label>
                    </div>
                </div>
                <section className="flex flex-col gap-5 mt-5">
                    <div className="flex gap-4">
                    <MdPriorityHigh  size={25}/>
                        {edit ? (
                            <select name="priority" onChange={handleChange} value={cardData.priority} id="Value" className="bg-accent_low px-2 w-[130px]">
                                <option value="To-do">To-do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Prioritize">Prioritize</option>
                            </select>
                        ) : (
                            <p>{cardData.priority === "backlog" ? cardData.priority : `${cardData.priority} priority`}</p>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <SlCalender size={25} />
                        {edit ? (
                            <input
                                type="date"
                                name="due_date"
                                value={cardData.due_date}
                                onChange={handleChange}
                                className="p-2 bg-accent_low rounded-lg"
                            />
                        ) : (
                            <p>{cardData.due_date}</p>
                        )}
                    </div>
                    <div className="flex gap-4">
                        
                        <GiNotebook size={25} />
                        {edit ? (
                        <Textarea
                            name="description"
                            value={cardData.description}
                            onChange={(e) => handleChange(e)}
                            heading="Description"
                        />
                            ) : (
                            <p>{cardData.description}</p>
                            )
                        }
                    </div>
                </section>
                {error && <p className="text-red-600">{error}</p>}
                <div className="ml-10 flex gap-2">
                    {edit && (
                        
                    <Button onClick={handleSave} classname={!loading ? "bg-primary text-secondary" : ""}>
                    {loading ? "Saved..." : "Save"}
                </Button>
                    )}
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
