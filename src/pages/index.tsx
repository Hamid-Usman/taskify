import { motion } from "framer-motion"
import { LinkButton } from "../components/buttons/linkButtons"
export const Index = () =>{
    return (
        <article className="w-full h-[100vh]
            flex flex-col gap-7 justify-center items-center
            px-10 md:px-14 lg:px-[20%] text-center">
                <h1 className="text-[30px] lg:text-[50px] font-bold">
                    Your Task Manager Sucks! Use <span className="text-primary animate-pulse transition duration-[2s]">Taskify</span> Instead
                </h1>
                <p className="text-accent text-[18px]">
                    Trello's too basic? or Jira's too complex? Join millions of users in using a much better task manager. Combining the best of both worlds and more
                </p>
                <motion.div
                whileHover={{y: 10}}
                transition={{duration: .6}}>
                    <LinkButton
                        link="/register"
                    >
                        Get Started!
                    </LinkButton>

                </motion.div>
        </article>
    )
}