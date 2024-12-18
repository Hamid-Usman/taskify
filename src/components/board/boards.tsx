"use client"
import { useState } from "react"
import { FaUser } from "react-icons/fa6"
import { BoardModal, SpaceProp } from "../../modals/boardModal"
import { Link } from "react-router-dom"
export const UserBoards = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [space, setSpace] = useState<SpaceProp | null>(null)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)
    return (
        <section className="mt-5 mx-7 border-accent_low border-t-[1px]">
            <div className="flex items-center pt-5">
                <FaUser size={20} />
                <h1 className="px-2 font-bold">My Boards</h1>
            </div>

            <div className="flex flex-wrap justify-between lg:justify-normal lg:gap-3">

                {/* need to return to this later on to fix the boards rendering */}
                {space ? (
                    
                <Link to='/board' className="w-[48%] lg:w-[220px] h-[80px] mt-2 p-1
                    bg-primary hover:bg-primary_low text-secondary font-bold rounded-md
                    text-[14px] md:text-lg ">
                    <h1>Workout Routines</h1>
                </Link>
                ):(
                    
                <Link to='/board' className="w-[48%] lg:w-[220px] h-[80px] mt-2 p-1
                    bg-primary hover:bg-primary_low text-secondary font-bold rounded-md
                    text-[14px] md:text-lg ">
                    <h1>Workout Routines</h1>
                </Link>
                )
                }

                <article className="w-[48%] lg:w-[220px] h-[80px] mt-2
                    bg-accent_low text-accent font-bold rounded-md
                    flex justify-center items-center text-[14px] md:text-lg">
                    <h1 onClick={openModal}>Create a new board</h1>
                </article>
                {/* function for opening the the board creation modal */}
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
