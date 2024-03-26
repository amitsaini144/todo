

interface Myprops {
    label: string;
    onClick?: () => void;
}
export default function Button({ label, onClick }: Myprops){
    return <button onClick={onClick} type = "button" className="w-full bg-blue-600 text-sm text-white font-medium rounded-lg mx-12 mb-6">{label}</button>
}