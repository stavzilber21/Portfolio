import { useState ,useEffect} from 'react'
import TodoComp from "./Todo";
import Button from "../UI/Button";

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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p>Todos - User {userId}</p>
      <Button
          type="button"
          title="Add"
          onClick={addTodoHandler}
      />
    </div>

      <div style={!addTodo ? {border: "2px solid black", overflowY: "scroll", maxHeight: "250px"} : {border: "2px solid black", padding: "10px"}}>
        
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
            <Button
                type="button"
                title="Cancel"
                onClick={() => setAddTodo(false)}
            />
            <Button
                type="submit"
                title="Add"
            />
         </form> 
        }
        </div>
      </>
  )
}

export default TodosComp

