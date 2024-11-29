import { Header } from "../components/header/header"

export const Home = () => {
    return (
        <div className="w-[100vw] h-[100vh]">
        
                <Header />
            <main className="px-12">
                <section>
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
                            <p className="text-[13px]">Private</p>
                        </div>
                    </div>
                    
                </section>

                <section className="py-10">
                    <h1 className="text-lg font-extrabold">The Hardest templates you'll ever need🥶🔥</h1>
                    <p className="font-semibold">Get on faster with our highly rated templates</p>

                </section>

            </main>
        </div>
    )
}