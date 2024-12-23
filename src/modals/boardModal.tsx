import { useState } from "react";
import Backdrop from "./backdrop";
import { motion } from "framer-motion";
import { Button } from "../components/buttons/button";

export interface SpaceProp {
    id?: number;
    title: string;
    description: string;
}

interface SpaceModalProp {
    closeModal: ()=> void
    setSpace: React.Dispatch<React.SetStateAction<SpaceProp | null>>;
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
export const BoardModal: React.FC<SpaceModalProp> = ({closeModal, setSpace}) => {
    const [des, setDescription] = useState('')
    const [boardName, setBoardName] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setSpace({
            
            title: boardName,
            description: des,
        });
        console.log('Board Created:', { title: boardName, des });

        closeModal()

    }

    return (
        <Backdrop onClick={closeModal}>
        
            <motion.form onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="bg-accent_low w-[320px] rounded-md
                    py-2 px-2 flex flex-col"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h1 className="text-center">Create Board</h1>

                <div className="flex flex-col gap-1 mt-5">
                    <label htmlFor="" className="text-[12px] font-bold">
                        Board Title <span className="text-primary">*</span>
                    </label>
                    <input type="text"
                        value={boardName}
                        onChange={(e) => setBoardName(e.target.value)}
                        className="w-[300px] rounded-sm bg-secondary 
                            focus:outline-none border-[1px] border-accent
                            focus:border-primary p-1"/>
                </div>
                <div className="flex flex-col gap-1 mt-5">
                    <label htmlFor="" className="text-[12px] font-bold">
                        Description
                    </label>
                    <input type="text"
                        value={des}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-[300px] rounded-sm bg-secondary 
                            focus:outline-none border-[1px] border-accent
                            focus:border-primary p-1"/>
                </div>
                
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
