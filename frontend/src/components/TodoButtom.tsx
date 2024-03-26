interface Myprops {
    label: string;
    onClick?: () => void;
}
export default function TodoButton({ label, onClick }: Myprops){
    return <button onClick={onClick} className="bg-blue-600 text-white px-3 rounded-sm ring-1 ring-blue-600 h-9 m-1">{label}</button>
}