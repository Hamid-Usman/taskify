
import { Button } from "../components/buttons/button";

/*interface AuthProps {
    email: string;
    password: string;
    confirm_password: string
}*/
export const Register = () => {
    /* const [authData, setAuthData] = useState<AuthProps> ({
        email: '',
        password: '',
        confirm_password: '',
    })
    */

    return (
        <form className="w-[340px] md:w-[420px] p-5 flex flex-col gap-5
            bg-white bg-opacity-60 backdrop-blur-lg text-primary rounded-md">
            <div className="font-bold text-center mb-3">
                <h1 className="text-[30px] font-bold">Register</h1>
                <p className="text[18px] sm:text-[20px] font-bold text-secondary "
                >
                    Create an account to get started
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor=""className="font-bold"
                >
                    Email
                </label>
                <input type="email"
                    name="email"
                    className="rounded-md p-1 py-3 bg-accent text-secondary"/>
            </div>
            <Button>Click</Button>
        
        </form>
    ) 
}