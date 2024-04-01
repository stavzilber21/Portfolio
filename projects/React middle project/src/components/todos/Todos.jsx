import { useState ,useEffect} from 'react'
import axios from 'axios';
import TodoComp from "./Todo";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export const TodosComp = (props) => {
    const [todos, setTodos] = useState([]);
  
    useEffect(() => {
        async function getData() {
            let resp = await axios.get(`${TODOS_URL}?userId=${props.id}`);
            setTodos(resp.data);
        }
        getData();
    }, [props.id]);
  return (
    <div style={{border : "2px solid black"}}>
       
       {
        todos.map((todo) =>
        {
           
            return <TodoComp key={todo.id} todoData={todo} />
        })
      }
      </div>
  )
}

export default TodosComp

