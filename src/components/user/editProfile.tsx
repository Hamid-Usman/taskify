//import profileHeader from "../../assets/waistup-shot-relaxed-relieved-happy-african-american-young-female-student-striped-tshirt.jpg"
import { Link } from "react-router-dom"
import { Button } from "../buttons/button"
export const EditProfile = () => {
    return (
        <div className="px-5 md:px-20 lg:px-96 mt-14 flex flex-col items-center">
            <div className="w-fit md:w-[530px]">
                {/**
                <img className="  w-full" src={profileHeader} /> */}
                <label htmlFor="" className="">
                    <h1 className="text-xl md:text-2xl font-bold">Manage your personal info here</h1>
                    <p>To learn more, view out <Link to={''} >Terms of Services and Privacy Policy</Link></p>
                </label>
                
                <h1 className="border-b font-bold text-lg my-5">About</h1>
                <form action="" className="flex flex-col gap-1 my-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Fullname</label>
                        <input type="text"
                            className="p-2 text-[14px] rounded border bg-accent_low w-[320px]"
                            placeholder="Hamid"/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Bio</label>
                        <textarea className="px-2 rounded bg-accent_low border h-[90px] w-[320px]"
                            placeholder="<H1>Hello, World!</H1>"/>
                    </div>
                    <Button>Submit</Button>
                </form>
            </div>
        </div>
    )
}