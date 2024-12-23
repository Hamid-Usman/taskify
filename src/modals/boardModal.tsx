import { useState } from "react";
import Backdrop from "./backdrop";
import { motion } from "framer-motion";
import { Button } from "../components/buttons/button";

export interface SpaceProp {
    id?: number;
    title: string;
}

interface SpaceModalProp {
    closeModal: ()=> void
}

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

//Under considertion: redirecting Modal button to user profile
export const BoardModal: React.FC<SpaceModalProp> = ({closeModal}) => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const token = localStorage.getItem("authToken")
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if(!token){
            console.error("No token provided")
            return
        }

        try {
            const response = await fetch(`${apiUrl}/boards/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({title})
            });
            if (!response.ok) {
                throw new Error(`Failed to create board. Status: ${response.status}`)
            }
            setTitle('')
        }
        catch(err) {
            console.error("Error creating board:", err);
            setError((err as Error).message || "An unexpected error occurred");
        }
        finally {
            setLoading(false)
            closeModal()
        }


    }

    return (
        <Backdrop onClick={closeModal}>
        
            <motion.form onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="bg-accent_low w-[320px] rounded-md
                    py-2 px-2 flex flex-col gap-5"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h1 className="text-center">Create Board</h1>

                <div className="flex flex-col gap-1">
                    <label htmlFor="" className="text-[12px] font-bold">
                        Board Title <span className="text-primary">*</span>
                    </label>
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-[300px] rounded-sm bg-secondary 
                            focus:outline-none border-[1px] border-accent
                            focus:border-primary p-1"/>
                </div>
                    <button className="w-[300px] rounded-sm bg-primary text-secondary font-semibold"
                    >Create Board

                    </button>
                
                {/* 
                    <Button
                        classname=""
                        onClick={}>
                        Create Workspace
                    </Button> 
                */}
            </motion.form>
        </Backdrop>
    );
};
