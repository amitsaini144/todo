
interface Myprops{
    label: string;
}

export default function Heading({label} : Myprops ) {
    return <div  className="font-bold text-3xl pt-6 h-1/6 mx-2">
        {label}
    </div>
}