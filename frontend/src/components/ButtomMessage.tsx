import { Link } from "react-router-dom";

interface Myprops {
    label: string;
    to: string;
    linktext?: string;
}

export default function ButtomMessage({ label, to, linktext }: Myprops) {
    return <div className="flex text-sm">
        <div className="mr-1 text-slate-500">
            {label}
        </div>
        <Link className="text-blue-600 font-medium"to={to}>{linktext}</Link>
    </div>
}