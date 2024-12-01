
import { FaBell, FaMagnifyingGlass } from "react-icons/fa6";
import { ButtonsSmall } from "./headerSmall";
import { UserImage } from "../user/image";
import { Link } from "react-router-dom";

export const Header = () => {

    return (
        <nav
        className="px-3 py-2 md:py-1 fixed top-0 w-[100vw] border-b-[1px] border-accent_low
                flex justify-between items-center z-50"
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
            <Link to='/' className="text-accent text-[20px] font-bold">Taskify</Link>

            {/* functions for medium and above screen */}
            <button
            className="hidden md:block font-bold hover:bg-accent_low p-2 px-5
                            rounded-md text-[14px]
                            transition duration-300 ease-in-out"
            >
            Workspace
            </button>
            <button
            className="hidden md:block font-bold hover:bg-accent_low p-2 px-5
                            rounded-md text-[14px]
                            transition duration-300 ease-in-out"
            >
            Boards
            </button>

            {/* Small screen button */}
            <ButtonsSmall />
            {/* End of small screen button */}

            <button
            className="hidden md:block bg-primary text-secondary px-4
                        rounded-md text-2xl font-bold"
            >
            +
            </button>
        </div>

        <div className="flex gap-4 items-center">
            <FaMagnifyingGlass size="20" className="cursor-pointer text-gray font-bold" />

            <FaBell size="20" className="cursor-pointer text-accent rotate-45" />
            <UserImage />
        </div>
        </nav>
    );
};
