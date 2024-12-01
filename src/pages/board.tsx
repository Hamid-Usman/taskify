import { FaPlus } from "react-icons/fa6"
import { Button } from "../components/buttons/button"
import { Header } from "../components/header/header"
import { BoardHeader } from "../components/header/boardHeader"
import { BoardInput } from "../components/board/boardInput"

export const Board = () => {
    return (
        <>
            <Header />
            <BoardHeader />

            <div className="absolute top-28 w-full">
            <section className="p-4 flex gap-3 w-full items-start
                board-overflow pb-60">
                <article className="min-w-[272px] flex flex-col bg-[#010B13] rounded-lg p-3">
                    <BoardInput />
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
                
                <div className="min-w-[282px] flex flex-col bg-[#010B13] rounded-lg p-3">
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