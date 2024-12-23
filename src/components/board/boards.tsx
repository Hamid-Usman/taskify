"use client"
import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa6"
import { BoardModal, SpaceProp } from "../../modals/boardModal"
import { Link } from "react-router-dom"
export const UserBoards = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [board, setBoard] = useState<SpaceProp[]>([])
    const [space, setSpace] = useState<SpaceProp | null>(null)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    const token = 'c7188fd115c03c6d2b31f6dcce1cca586cbe2a41';
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchBoards = async () => {
        try {
            if(!token) {
                console.error("No token provided");
                return;
            }
            const response = await fetch(`${apiUrl}/boards/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Token ${token}`,
                    },
                })
                if (!response.ok) {
                    throw new Error(`Failed to fetch boards. Status: ${response.status}`)
                }
                const data = await response.json()
                setBoard(data)
            }
        catch(err) {
            console.error('Error fetching boards:', err)
        }
    }

    useEffect(() => {
        fetchBoards()
    }, [])

    return (
        <section className="mt-5 mx-7 border-accent_low border-t-[1px]">
            <div className="flex items-center pt-5">
                <FaUser size={20} />
                <h1 className="px-2 font-bold">Your Boards</h1>
            </div>

            <div className="flex flex-wrap justify-between lg:justify-normal lg:gap-3">

                {/* need to return to this later on to fix the boards rendering */}
                {board.length > 0 && (
                    board.map((space) => (
                        <Link to={`/board/${space.id}`} key={space.id} className="w-[48%] lg:w-[220px] h-[80px] mt-2 p-1
                            bg-primary hover:bg-black text-secondary hover:text-primary transition 
                            duration-300 ease-in-out font-bold rounded-md
                            text-[14px] md:text-lg ">
                            <h1>{space.title}</h1>
                        </Link>
                    ))
                )}

                <div className="w-[48%] lg:w-[220px] h-[80px] mt-2
                    bg-accent_low text-accent font-bold rounded-md
                    flex justify-center items-center text-[14px] md:text-lg cursor-pointer"
                >
                    Create a new board
                </div>
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
