import { Link } from "react-router-dom"
import React from "react"

interface LinkButtonProp {
    link: string;
    children: React.ReactNode;
}

export const LinkButton: React.FC<LinkButtonProp> = ({link, children}) => {
    return (
        <>
            <Link to={link}
                className="z-20 p-3 px-5 bg-primary text-secondary
                    rounded-xl font-bold"
                >
                    {children}
            </Link>
        </>

    )
}
