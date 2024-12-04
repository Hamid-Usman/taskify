import { motion } from "framer-motion"

interface BackdropProp {
    children: React.ReactNode,
    onClick: ()=> void
}
const Backdrop: React.FC<BackdropProp> = ({children, onClick}) => {
    
    return (
        <motion.div
        initial={{ opacity: 0}}
        animate= {{opacity: 1}}
        exit= {{opacity: 0}}
        onClick={onClick}
        className="fixed top-0 left-0 w-full h-full bg-[#000000e1]
                flex justify-center items-center z-10"
        >
            {children}

        </motion.div>
    )
}

export default Backdrop