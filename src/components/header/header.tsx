
import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";
import { ButtonsSmall } from "./headerSmall";

export const Header = () => {

    return (
        <nav
        className="px-3 py-1 border-b-2 border-primary
                flex justify-between items-center"
        >
        <div className="flex items-center gap-2">
            <div className="p-2 bg-primary_low transition duration-300
                rounded-md">
                {/* 
                <FaCloudBolt
                size={20}
                className=" z-20"/>
                */}
            </div>
            <strong className="text-accent text-[20px]">Taskify</strong>

            {/* functions for medium and above screen */}
            <button
            className="hidden md:block font-bold hover:bg-primary_low p-2 px-5
                            rounded-md text-[14px]
                            transition duration-300 ease-in-out"
            >
            Workspace
            </button>
            <button
            className="hidden md:block font-bold hover:bg-primary_low p-2 px-5
                            rounded-md text-[14px]
                            transition duration-300 ease-in-out"
            >
            Boards
            </button>

            {/* Small screen button */}
            <ButtonsSmall />
            {/* End of small screen button */}

            <button
            className="bg-primary px-4
                        rounded-md text-2xl font-bold"
            >
            +
            </button>
        </div>

        <div className="flex gap-4 items-center">
            <FaMagnifyingGlass size="20" className="cursor-pointer text-gray font-bold" />

            <FaBell size="20" className="cursor-pointer text-accent rotate-45" />

            <p className="cursor-pointer w-[30px] h-[30px] bg-primary rounded-full
                    flex justify-center items-center"
            >
            A
            </p>
        </div>
        </nav>
    );
};
