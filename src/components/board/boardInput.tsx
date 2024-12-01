import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react"
export const BoardInput = () => {
    const [editing, setEditing] = useState<Boolean>(false)
    const [content, setContent] = useState<string>('Backlog')
    const textRef = useRef<HTMLTextAreaElement>(null)
    const hRef = useRef<HTMLHeadingElement>(null)

    const handleClick = () => {
        setEditing(true)
    }

    const handleHide = () => {
        setEditing(false)
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
        <div className="w-100 mb-5  ">
            {editing ? (
                
            <textarea
            ref={textRef}
            className="w-full h-[30px] text-start px-2 rounded-md"
            value={content}
            onChange={handleChange}
            onBlur={handleHide}
            onKeyDown={handleKeyDown}
            />
            ): (
            
            <h1
            ref={hRef}
            className="hover:bg-accent_low rounded-md px-2"
            onClick={handleClick}>
                {content}
            </h1>
            )}
        </div>
    )
}