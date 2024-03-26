import Heading from "../components/Header"
import TodoInput from "../components/TodoInput"
import TodoButton from "../components/TodoButtom"
import axios from "axios"
import { useState } from "react"
import { TodoList } from "../components/TodoList"

export default function HomePage() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [load, setLoad] = useState(true);


    return <div className=" bg-white h-full flex items-center justify-center ">
        <div className="flex flex-wrap justify-center w-full min-h-screen bg-white/20 rounded-sm sm:mx-10 p-3">
            <div>
                <div className="sm:mx-40 lg:mx-96 text-center">
                    <Heading label="Todo App" />
                    <TodoInput placeholder="Title" onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                    <TodoInput placeholder="Description" onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <TodoButton label="Add Task" onClick={async () => {
                        await axios.post("http://localhost:3000/create", {
                            title,
                            description,
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                       setLoad(prevState => !prevState)
                    }} />
                </div>
                <div className="">
                    <TodoList load={load}/>
                </div>

            </div>

        </div>
    </div>

}