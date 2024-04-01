import { useState, useEffect } from 'react';
import axios from 'axios';
import UserComp from './User';
import TodosComp from '../todos/Todos';
import PostComp from '../posts/Posts'

function UsersComp() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isSelectedId, setIsSelectedId] = useState(false);

  useEffect(() => {
    async function getData() {
    let resp1 = await axios.get("https://jsonplaceholder.typicode.com/users");
     let resp2 = await axios.get("https://jsonplaceholder.typicode.com/todos");
     let resp3 = await axios.get("https://jsonplaceholder.typicode.com/posts");

      setUsers(resp1.data)
      setTodos(resp2.data)
      setPosts(resp3.data)

    }
    getData();
  }, []);

  const handleUpdate = (updatedUserData) => {
    // Find the index of the updated user in the users array
    const updatedUserIndex = users.findIndex(user => user.id === updatedUserData.id);
    if (updatedUserIndex !== -1) {
      // Create a new users array with the updated user
      const updatedUsers = [...users];
      updatedUsers[updatedUserIndex].name = updatedUserData.name;
      updatedUsers[updatedUserIndex].email = updatedUserData.email;
      // Update the state with the new users array
      setUsers(updatedUsers);
    }
  };

  const handleDelete = (userId) => {
    // Filter out the user to be deleted
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
};

const selectIdHandler = (id) => {
    // If pressed twice on the same id, the selected user will removed
    if (id === selectedUserId) {
        setIsSelectedId(false);
        setSelectedUserId(0);
        return;
      }
  
      setIsSelectedId(true);
      setSelectedUserId(id);
};


  const searchChange = () => {
    if (text.trim() !== '') {
      const filteredUsers = users.filter(user => user.name.includes(text) || user.email.includes(text));
      return filteredUsers;
    } else {
      return users;
    }
  };

  return (
    <div style={{display: "flex", margin:"8px"}}>
        <div style={{ width: "350px", border: "solid 2px gray", borderRadius: "25px" , padding: "10px"}}>
            Search: <input type='text' onChange={e => setText(e.target.value)} />
            {searchChange().map(user => (
                <div key={user.id} style={{ marginBottom: "10px" }}>
                <UserComp userData={user} onUpdate={handleUpdate} onDelete={handleDelete} onIdSelect={selectIdHandler}/>
                </div>
            ))}
        </div>
        <div style={{margin: "20px 30px", width: "350px"}}>
                {isSelectedId && (
                    <>
                        <p>Todos - User {selectedUserId}</p>
                        <TodosComp id={selectedUserId} />
                    </>
                    
                )}
                {isSelectedId && (
                    <>
                        <p>Posts - User {selectedUserId}</p>
                        <PostComp id={selectedUserId} />
                    </>
                )}
            </div>
    </div>
   
  );
}

export default UsersComp;
