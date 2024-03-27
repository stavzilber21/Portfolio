import { useState, useEffect } from 'react';
import axios from 'axios';
import UserComp from './User';

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
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


  const searchChange = () => {
    if (text.trim() !== '') {
      const filteredUsers = users.filter(user => user.name.includes(text) || user.email.includes(text));
      return filteredUsers;
    } else {
      return users;
    }
  };

  return (
    <div style={{ width: "350px", border: "solid 2px gray", borderRadius: "10px" }}>
      Search: <input type='text' onChange={e => setText(e.target.value)} />
      {searchChange().map(user => (
        <div key={user.id} style={{ marginBottom: "10px" }}>
          <UserComp userData={user} onUpdate={handleUpdate} onDelete={handleDelete}/>
        </div>
      ))}
    </div>
  );
}

export default App;
