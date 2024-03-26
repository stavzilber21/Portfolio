import { useState ,useEffect} from 'react'
import axios from 'axios';
import UserComp from './User';
// import './App.css'

function App() {
  const [users,setUsers]=useState([]);
  const [todos,setTodos]=useState([]);
  const [posts,setPosts]=useState([]);
  const [text,setText]=useState([]);


  useEffect(() =>
  {
    async function getData()
    {
     
     let resp1 = await axios.get("https://jsonplaceholder.typicode.com/users");
     let resp2 = await axios.get("https://jsonplaceholder.typicode.com/todos");
     let resp3 = await axios.get("https://jsonplaceholder.typicode.com/posts");

      setUsers(resp1.data)
      setTodos(resp2.data)
      setPosts(resp3.data)

    }
    getData();
  },[])

  const searchChange = () => {
    if(text){
      const users_filter= users.filter(user=>user.name.includes(text) || user.email.includes(text));
      return users_filter;
    }
    else{
      return users;
    }
  };

  return (
    <div style={{ width: "300px", border: "solid 2px black", borderRadius: "10px"} }>
    Search: <input type='text' onChange={e=>setText(e.target.value)}/> 
    {
        searchChange().map((user) => (
          <div key={user.id} style={{ marginBottom: "10px" }}> {/* Add margin bottom for spacing */}
            <UserComp userData={user} />
          </div>
        ))
      }
    </div>
  )
}

export default App
