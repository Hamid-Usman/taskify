import { Button } from "../components/buttons/button"

export const CreateBoard = () => {

    return (
        <form className="bg-accent_low w-[320px] rounded-md
            py-2 px-2 flex flex-col">
            <h1 className="text-center">Create Board</h1>

            <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="" className="text-[12px] font-bold">
                    Board Title <span className="text-primary">*</span>
                </label>
                <input type="text"
                    className="w-[300px] rounded-sm bg-secondary 
                        focus:outline-none border-[1px] border-accent
                        focus:border-primary p-1"/>
            </div>
            <div className="flex flex-col gap-1 mt-5">
                <label htmlFor="" className="text-[12px] font-bold">
                    Description
                </label>
                <input type="text"
                    className="w-[300px] rounded-sm bg-secondary 
                        focus:outline-none border-[1px] border-accent
                        focus:border-primary p-1"/>
            </div>

            <Button>
                Create
            </Button>
        </form>
    )
}