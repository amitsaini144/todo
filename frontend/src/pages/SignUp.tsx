import Heading from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ButtomMessage from "../components/ButtomMessage";
import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function SignUp() {
 
   const [firstName, setFirstName] = useState<string>("");
   const [lastName, setLastName] = useState<string>("");
   const [username, setUserName] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const navigate = useNavigate();

    return <div className="bg-black h-screen flex items-center justify-center ">
        
        <div className="bg-white w-80 h-5/6 flex justify-center rounded-3xl text-center flex-wrap shadow-lg">
            <Heading label="SignUp" />
            <SubHeading label="Enter your information to create an account" />
            <InputField placeholder="First name" type="text" onChange ={(e): void => {
                setFirstName(e.target.value);
            }} />
            <InputField placeholder="Last name" type="text" onChange ={(e) => {
                setLastName(e.target.value);
            }} />
            <InputField placeholder="E-mail" type="email" onChange ={(e) => {
                setUserName(e.target.value);
            }}/>
            <InputField placeholder="Password" type="password" onChange ={(e) => {
                setPassword(e.target.value);
            }}/>
            <Button label="SignUp" onClick = { async () => {
               const res = await axios.post("http://localhost:3000/signup", {
                username,
                firstName,
                lastName,
                password
               });
               localStorage.setItem("token", res.data.token);
               if(res.status === 200){
               navigate("/");
               }
            }}/>
            <ButtomMessage label="Already have an account?" linktext="SignIn"to="/signin" />
        </div>
    </div>
}