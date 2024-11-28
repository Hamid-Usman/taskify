import { Header } from "../components/header/header"

export const Main =() => {
    return (
        <section className="w-[100vw] h-[100vh]">
            <Header />
            <main className=" px-12">
                <div className="flex gap-5 items-center
                    py-14 border-accent_low border-b-[1px]">
                    <div className="w-16 h-16 rounded-md bg-primary
                        flex flex-col justify-center items-center
                        text-[35px] text-secondary font-bold"
                        >
                            H
                    </div>
                    <div>
                        <h1 className="font-bold text-xl">My Template</h1>
                        <p>Private</p>
                    </div>
                </div>
                
            </main>

        </section>
    )
}