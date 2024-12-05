import { motion } from "framer-motion";
interface ButtonProp {
    //onclick: ()=> void;
    children: React.ReactNode
}
export const Button: React.FC<ButtonProp> = ({children}) => {
    // need to make the button width more dynamic
    return (
        <motion.button
        whileTap={{scale:0.90}}
        transition={{duration: .8}}
        className="my-2 px-5 py-1 w-fit bg-primary rounded-md
        text-[16px] text-secondary font-bold"
        //onClick={onclick}
        >
            {children}
        </motion.button>
    )
} 