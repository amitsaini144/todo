import Heading from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ButtomMessage from "../components/ButtomMessage";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function SignIn() {

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    return <div className="bg-black h-screen flex items-center justify-center ">
        <div className="bg-white w-80 h-4/6 flex justify-center rounded-3xl text-center flex-wrap shadow-xl">
            <Heading label="SignIn" />
            <SubHeading label="Enter your information to signin to yuor account" />
            <InputField placeholder="E-mail" type="email" onChange={(e) => {
                setUserName(e.target.value);
            }} />
            <InputField placeholder="Password" type="password" onChange={(e) => {
                setPassword(e.target.value);
            }} />
            <Button label="SignIn" onClick={async () => {
                const res = await axios.post("http://localhost:3000/signin", {
                    username,
                    password
                });
                console.log(res);
                localStorage.setItem("token", res.data.token);
                if (res.data.token) {
                    navigate("/");
                }
            }} />
            <ButtomMessage label="Don't have an account?" to="/signup" linktext="SignUp" />
        </div>
    </div>
}