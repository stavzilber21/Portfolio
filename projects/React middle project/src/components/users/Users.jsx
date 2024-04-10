import { useState, useEffect } from "react";
import axios from "axios";
import UserComp from "./User";
import TodosComp from "../todos/Todos";
import PostComp from "../posts/Posts";

function UsersComp() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isSelectedId, setIsSelectedId] = useState(false);

  

  useEffect(() => {
    async function getData() {
      let resp1 = await axios.get("https://jsonplaceholder.typicode.com/users");
      let resp2 = await axios.get("https://jsonplaceholder.typicode.com/todos");
      let resp3 = await axios.get("https://jsonplaceholder.typicode.com/posts");

      setUsers(resp1.data);
      setTodos(resp2.data);
      setPosts(resp3.data);
    }
    getData();
  }, []);

  const handleUpdate = (updatedUserData) => {
    // Find the index of the updated user in the users array
    const updatedUserIndex = users.findIndex(
      (user) => user.id === updatedUserData.id
    );
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
    const updatedUsers = users.filter((user) => user.id !== userId);
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
    if (text.trim() !== "") {
      const filteredUsers = users.filter(
        (user) => user.name.includes(text) || user.email.includes(text)
      );
      return filteredUsers;
    } else {
      return users;
    }
  };

  const markCompleted = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    setTodos((todos) => {
      const newTodos = [...todos];
      newTodos[index].completed = true;

      return newTodos;
    });
  };

  const addTodo =(todoObj)=>{
    const newTodos = [...todos, todoObj];
    setTodos(newTodos);
  }

  const addPost =(postObj)=>{
    const newPosts = [...posts, postObj];
    setPosts(newPosts);
  }

  const addUser =()=>{
    
  }

  // If user id selected, will filter the lists according to the user id
  let userTodos = todos;
  let userPosts = posts;
  if (isSelectedId) {
    userTodos = todos.filter((todo) => todo.userId === selectedUserId);
    userPosts = posts.filter((post) => post.userId === selectedUserId);
  }

  return (
    <div style={{ display: "flex", margin: "8px" }}>

      <div
        style={{
          width: "350px",
          border: "solid 2px gray",
          borderRadius: "30px",
          padding: "10px", // Enable vertical scrolling
          maxHeight: "500px", // Limit the height to prevent excessive scrolling
        }}
      >
        <div style={{padding: "4px",margin: "4px", display: "flex", justifyContent: "space-between" }}>
          Search <input type="text" onChange={(e) => setText(e.target.value)} />
          <button onClick={addUser}>Add</button>
        </div>
        <div style={{
          overflowY: "scroll",maxHeight: "450px",padding: "4px",margin: "4px"}}>
               
          {searchChange().map((user) => {
            const userTodos = todos.filter((todo) => todo.userId === user.id);
            const allTodosCompleted = userTodos.every((todo) => todo.completed);
              let frame = 'red';
              if(allTodosCompleted){
                frame ='green'
              }
              let backgnd = 'initial';
              // Check if user id label pressed, to change the background color
              if (user.id === selectedUserId) {
                backgnd = 'orange';
              }
              return(
                <div key={user.id} style={{ marginBottom: "10px" }}>
                <UserComp
                  backgnd ={backgnd}
                  frame={frame}
                  userData={user}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onIdSelect={selectIdHandler}
                />
              </div>
              )
          
          } )}
        </div>
 
      </div>

      <div style={{ margin: "20px 30px", width: "350px" }}>
        {isSelectedId && (
          <>
            <TodosComp
              todos={userTodos}
              todosLen={todos.length}
              userId={selectedUserId}
              onMarkComplete={markCompleted}
              onAddTodo={addTodo}
            />
          </>
        )}
        {isSelectedId && (
          <>
            <PostComp 
              posts={userPosts}
              postsLen={posts.length}
              userId={selectedUserId}
              onAddPost={addPost}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UsersComp;
