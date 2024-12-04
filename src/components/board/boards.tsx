import { useState } from "react"
import { FaUser } from "react-icons/fa6"
import { BoardModal, SpaceProp } from "../../modals/boardModal"

export const UserBoards = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [space, setSpace] = useState<SpaceProp | null>(null)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)
    return (
        <section className="mt-5 mx-7 border-accent_low border-t-[1px]">
            <div className="flex items-center pt-5 px-2">
                <FaUser size={20} />
                <h1 className="px-2 font-bold">My Board</h1>
            </div>

            <div className="flex flex-wrap justify-between lg:justify-normal lg:gap-3">

                {space ? (
                    
                <article className="w-[48%] lg:w-[220px] h-[80px] mt-2 p-1
                    bg-primary hover:bg-primary_low text-secondary font-bold rounded-md
                    text-[14px] md:text-lg ">
                    <h1>Avanti</h1>
                </article>
                ):(
                    
                <article className="w-[48%] lg:w-[220px] h-[80px] mt-2 p-1
                    bg-primary hover:bg-primary_low text-secondary font-bold rounded-md
                    text-[14px] md:text-lg ">
                    <h1>No Boards</h1>
                </article>
                )
                }
                <article className="w-[48%] lg:w-[220px] h-[80px] mt-2
                    bg-accent_low text-accent font-bold rounded-md
                    flex justify-center items-center text-[14px] md:text-lg">
                    <h1 onClick={openModal}>Create a new board</h1>
                </article>
                {modalOpen && (
                    <BoardModal
                        closeModal={closeModal}
                        setSpace={setSpace}
                    />
                )}
            </div>
        </section>
    )
}
