import * as React from "react"
import { cn } from "../../lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
    heading: string;
    icon?: React.ReactNode;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps
    >(({heading, className, ...props }, ref) => {
    return (
        <div className="flex gap-3 w-[100%] items-start">
            <div >
                <h1 className="text-md font-bold mb-2">{heading}</h1>
                <textarea
                    className={cn(
                    "flex h-[70px] w-[290px] md:w-[300%] rounded-md border bg-accent_low px-3 py-2 text-base shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
                    className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        </div>
    )
})
Textarea.displayName = "Textarea"

export { Textarea }
