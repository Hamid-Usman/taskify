import { FaPlus } from "react-icons/fa6"
import { Button } from "../components/buttons/button"
import { Header } from "../components/header/header"
import { BoardHeader } from "../components/header/boardHeader"

export const Board = () => {
    return (
        <>
            <Header />
            <BoardHeader />

            <div className="absolute top-28">
            <section className="p-4 flex gap-3 items-start overflow-x-auto">
                <article className="w-[300px] flex flex-col bg-[#010B13] rounded-lg p-3">
                    <h1 className="font-semibold text-md mb-3">Backlog</h1>
                    <div className="bg-accent_low p-2 mb-2 text-[13px] sm:text-[14px] rounded-lg hover:border-[1px] border-accent">
                        Implement drag and drop
                    </div>
                    <div className="bg-accent_low p-2 mb-2 text-[13px] sm:text-[14px] rounded-lg hover:border-[1px] border-accent">
                        Build the Backend
                    </div>

                    <Button>
                        <div className="flex gap-2 items-center">
                            <FaPlus />
                            Add new card
                        </div>
                    </Button>
                </article>
                <article className="w-[300px] flex flex-col bg-[#010B13] rounded-lg p-3">
                    <h1 className="font-semibold text-md mb-3">In Progress</h1>
                    <div className="bg-accent_low p-2 mb-2 text-[13px] sm:text-[14px] rounded-lg hover:border-[1px] border-accent">
                        Implement drag and drop functionality
                    </div>
                    <div className="bg-accent_low p-2 mb-2 text-[13px] sm:text-[14px] rounded-lg hover:border-[1px] border-accent">
                        build forms for creating tasks and boards
                    </div>

                    <Button>
                        <div className="flex gap-2 items-center">
                            <FaPlus />
                            Add new card
                        </div>
                    </Button>
                </article>
                <article className="w-[300px] flex flex-col bg-[#010B13] rounded-lg p-3">
                    <h1 className="font-semibold text-md mb-3">Testing (God abeg🤲🏾)</h1>

                    <Button>
                        <div className="flex gap-2 items-center">
                            <FaPlus />
                            Add new card
                        </div>
                    </Button>
                </article>
                <article className="w-[300px] flex flex-col bg-[#010B13] rounded-lg p-3">
                    <h1 className="font-semibold text-md mb-3">Done</h1>
                    <div className="bg-accent_low p-2 mb-2 text-[13px] sm:text-[14px] rounded-lg hover:border-[1px] border-accent">
                        Structure mini header for Board Title
                    </div>

                    <Button>
                        <div className="flex gap-2 items-center">
                            <FaPlus />
                            Add new card
                        </div>
                    </Button>
                </article>
                
                <div className="w-[300px] flex flex-col bg-[#010B13] rounded-lg p-3">
                    <Button>
                        <div className="flex gap-2 items-center">
                            <FaPlus />
                            Create a board
                        </div>
                    </Button>
                </div>

            </section>
            </div>

        </>
        
    )
}