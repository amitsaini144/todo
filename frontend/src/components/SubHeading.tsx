interface Myprops{
    label: string;
}

export default function SubHeading({label} : Myprops ) {
    return <div  className="-mt-8 h-min text-slate-500 text-sm px-8 ">
        {label}
    </div>
}