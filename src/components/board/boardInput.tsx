import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react"
import { FaPen } from "react-icons/fa6"
export const BoardInput = ({ initialTitle, onSave }: { initialTitle: string, onSave: (newTitle: string) => void }) => {
    const [editing, setEditing] = useState<Boolean>(false)
    const [content, setContent] = useState<string>(initialTitle)
    const textRef = useRef<HTMLTextAreaElement>(null)
    const hRef = useRef<HTMLHeadingElement>(null)

    const handleClick = () => {
        setEditing(true)
    }

    const handleHide = () => {
        setEditing(false)
        onSave(content)
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value)

    }
    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setEditing(false);
        }
    };
    const handleOutsideClick = (event: MouseEvent) => {
        if (textRef.current && !textRef.current.contains(event.target as Node) && !hRef.current?.contains(event.target as Node)) {
            setEditing(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    return (
        <div className="w-full">
            {editing ? (
                
            <textarea
            ref={textRef}
            className="w-full h-[30px] text-start px-2 rounded-md bg-primary_low text-primary focus:outline-8 border"
            value={content}
            onChange={handleChange}
            onBlur={handleHide}
            onKeyDown={handleKeyDown}
            />
            ): (
            <div
                ref={hRef}
                onClick={handleClick}
                className="h-[30px] rounded-md flex justify-between items-center px-2 hover:bg-accent_low ">
                
                <h1
                className=" flex items-center"
                >
                    {content}
                </h1>
                    <FaPen/>
            </div>
            )}
        </div>
    )
}