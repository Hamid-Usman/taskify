import { FaAngleUp } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Link } from "react-router-dom";


export const ButtonsSmall = () => {
    {/* 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);
*/}
    
    return (
        <div className="md:hidden">
        
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="text-accent hover:bg-accent_low font-bold p-1 px-3
                    rounded-md flex gap-2 items-center">
                    More
                    <FaAngleUp 
                    className="rotate-180"
                    size={20}/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-accent w-[280px]">
                <Link to='/board' className="hover:bg-secondary">
                    <DropdownMenuItem>Workshop</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Boards</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        {/*
        
        {isDropdownOpen && (
            
        <div
        ref={dropdownRef}
        className="md:hidden absolute top-[50px] left-[6.4rem] bg-primary_low shadow-lg rounded-md 
                    flex flex-col z-50 w-[220px] sm:w-[250px] border border-accent"
        >
            <button
            className="flex justify-between items-center font-bold hover:bg-primary_low p-2 px-5
                        rounded-t-md text-[14px]
                        transition duration-300 ease-in-out text-left"
            >
                Workspace
                <FaAngleUp 
                className="rotate-180"
                size={20}
                />
            </button>
            <button
            className="flex justify-between items-center font-bold hover:bg-primary_low p-2 px-5
                        rounded-b-md text-[14px]
                        transition duration-300 ease-in-out text-left"
            >
                Boards
                <FaAngleUp 
                className="rotate-180"
                size={20}
                />
            </button>
        </div>
        )}
        */}
        </div>
    )
}