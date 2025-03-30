import { FieldError } from "react-hook-form";

interface InputProp {
    label: string;
    type: string;
    register?: any;
    error?: FieldError
}
export default function Input({ label, type, register, error }: InputProp) {
    return (
        <div className="flex flex-col gap-1 mb-4">
            <label className="font-bold">{label}</label>
            <input type={type} {...register}
            className={`${error ? "border-error_subtle" : ""} border-2 outline-none rounded-md p-1 bg-accent text-secondary`}/>
            {error && <span className="text-error_subtle">{error.message}</span>}
        </div>
    );
}