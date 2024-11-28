import { motion } from "framer-motion";
interface ButtonProp {
    //onclick: ()=> void;
    children: React.ReactNode
}
export const Button: React.FC<ButtonProp> = ({children}) => {
    return (
        <motion.button
        whileTap={{scale:0.90}}
        transition={{duration: .8}}
        className="px-5 py-2 bg-primary rounded-md
        text-[18px] text-white font-bold"
        //onClick={onclick}
        >
            {children}
        </motion.button>
    )
}