import { UserBoards } from "../components/board/boards"
import { Header } from "../components/header/header"

export const Home = () => {
    return (
        <div className="w-[100vw] h-[100vh]">
        
                <Header />
            <main className="top-10">
                <section className="px-12">
                    <div className="flex gap-5 items-center
                        pb-10 pt-20">
                        <div className="w-16 h-16 rounded-md bg-primary
                            flex flex-col justify-center items-center
                            text-[35px] text-secondary font-bold"
                            >
                                H
                        </div>
                        <div>
                            <h1 className="font-bold text-xl">Endurecido</h1>
                            <p className="text-[13px]">Private</p>
                        </div>
                    </div>
                    
                </section>

                <UserBoards />

            </main>
        </div>
    )
}