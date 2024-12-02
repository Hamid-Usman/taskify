import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react"
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
            
            <h1
            ref={hRef}
            className="hover:bg-accent_low h-[30px] rounded-md px-2 flex items-center"
            onClick={handleClick}>
                {content}
            </h1>
            )}
        </div>
    )
}