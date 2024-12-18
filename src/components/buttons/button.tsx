import { motion } from "framer-motion";
interface ButtonProp {
    classname: string;
    onClick: ()=> void;
    children: React.ReactNode;
}
export const Button: React.FC<ButtonProp> = ({classname, children, onClick}) => {
    // need to make the button width more dynamic
    return (
        <motion.button
        whileTap={{scale:0.90}}
        transition={{duration: .8}}
        className={`my-2 px-5 py-1 w-fit bg-primary rounded-md
        text-[16px] text-secondary font-bold ${classname}`}
        onClick={onClick}
        >
            {children}
        </motion.button>
    )
} 