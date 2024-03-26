import {  ChangeEvent } from "react";

interface Myprops {
    placeholder: string;
    type: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void ;
}

export default function InputField({ placeholder, type, onChange}: Myprops) {
    return <div className="">
        <input onChange={onChange} placeholder={placeholder} type={type} className=" rounded-lg p-3 text-sm px-4 pr-12 outline-none ring-1 focus:ring-2 focus:ring-blue-600"/>
    </div>
}