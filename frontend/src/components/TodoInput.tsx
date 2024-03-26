import {  ChangeEvent } from "react";


interface MyProps {
    placeholder: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoInput({ placeholder, onChange }: MyProps) {
    return <div className="min-w-96">
        <input type="text" onChange={onChange} placeholder={placeholder} className="input input-bordered input-info max-w-xs w-full sm:w-full focus:outline-none h-9 mb-1 " />
    </div>
}