import {
    Cloud,
    CreditCard,
    Github,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Settings,
    User,
    Users,
    } from "lucide-react"
    
    import { Button } from "../components/ui/button"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuGroup,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuPortal,
        DropdownMenuSeparator,
        DropdownMenuShortcut,
        DropdownMenuSub,
        DropdownMenuSubContent,
        DropdownMenuTrigger,
    } from "../components/ui/dropdown-menu"
    
    export function ProfileDropdown() {
        return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button>
                <p className="cursor-pointer w-[30px] h-[30px] bg-primary rounded-full
                flex justify-center items-center text-secondary
                font-bold"
                >
                    A
                </p>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                <User />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <CreditCard />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                <Users />
                <span>The Developer</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                    <DropdownMenuItem>
                        <Mail />
                        <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <MessageSquare />
                        <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    </DropdownMenuSubContent>
                </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Github />
                <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <LifeBuoy />
                <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
                <Cloud />
                <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut />
                <span>Log out</span>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        )
    }
    