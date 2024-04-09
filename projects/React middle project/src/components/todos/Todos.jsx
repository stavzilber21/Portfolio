import { useState ,useEffect} from 'react'
import axios from 'axios';
import TodoComp from "./Todo";


export const TodosComp = ({ todos,todosLen, userId, onMarkComplete,onAddTodo}) => {
   const [addTodo, setAddTodo] = useState(false)
   const [userIdClicked, setUserIdClicked] = useState(0);
   const [title, setTitle] = useState('')
  
   useEffect(() => {
    if (userId !== userIdClicked) {
      setAddTodo(false);
    }
  }, [userId]);

    const addTodoHandler = () => {
      setAddTodo(true);
      setUserIdClicked(userId);
    };

    const submitHandler = (event) => {
      event.preventDefault();
  
      const newTodo = {
        userId,
        id: todosLen+1,
        title,
        completed: false,
      };
  
      setTitle("");
      setAddTodo(false);
      onAddTodo(newTodo);
    };
  

  return (
    <>
    <div>
      <p>Todos - User {userId}</p> <button onClick={addTodoHandler}>Add</button>
    </div>
      <div style={{border : "2px solid black"}}>
        
        {!addTodo &&
          todos.map((todo) =>
          {
            
              return <TodoComp key={todo.id} todoData={todo}  onMarkComplete={()=>onMarkComplete(todo.id)}/>
          })
        }
        {
         addTodo && 
         <form onSubmit={submitHandler}>
            Title: <input type='text' onChange={(e)=>setTitle(e.target.value)}/><br/>
            <button onClick={() => setAddTodo(false)}>Cancel</button><button type='submit'>Add</button>
         </form> 
        }
        </div>
      </>
  )
}

export default TodosComp

