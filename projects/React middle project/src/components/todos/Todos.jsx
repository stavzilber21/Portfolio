import { useState ,useEffect} from 'react'
import axios from 'axios';
import TodoComp from "./Todo";


export const TodosComp = ({ todos, userId, onMarkComplete}) => {
  
    useEffect(() => {
        
    }, [userId]);

  return (
    <div style={{border : "2px solid black"}}>
       
       {
        todos.map((todo) =>
        {
           
            return <TodoComp key={todo.id} todoData={todo}  onMarkComplete={()=>onMarkComplete(todo.id)}/>
        })
      }
      </div>
  )
}

export default TodosComp

