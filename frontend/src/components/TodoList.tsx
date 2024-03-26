import { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "./TodoCards";

interface myprops {
  load: boolean
}

export const TodoList = ({ load }: myprops) => {

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/get")
      .then(response => {
        setTodo(response.data.todo)
      })
  }, [load])


  interface TODO {
    id: number;
    title: string;
    description: string;
    done: boolean;
    userId: number;
  }

  function call(c: TODO) {
    return <div key={c.id} >
      <TodoCard label={c} />
     
    </div>
  }

  return <>
    {todo.map(call)}
  </>
}