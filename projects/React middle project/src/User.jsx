import { useState, useEffect } from 'react';
import axios from 'axios';

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function UserComp(props) {
    const [todos, setTodos] = useState([]);
    const [address, setAddress] = useState({ street: '', city: '', zip: '' });

    useEffect(() => {
        async function getData() {
            let resp = await axios.get(`${TODOS_URL}?userId=${props.userData.id}`);
            setTodos(resp.data);
        }
        getData();
    }, [props.userData.id]);

    // Function to check if all todos are completed
    const areAllTodosCompleted = () => {
        if (todos.length === 0) {
            return false; // If todos is empty, assume not all todos completed
        }
        const todosNotCompleted = todos.filter(todo => !todo.completed);
        return todosNotCompleted.length === 0;
    };

    // Handlers for input changes (not implemented, add your logic here)
    const handleNameChange = (event) => {
        // Add your logic to handle name change
    };

    const handleEmailChange = (event) => {
        // Add your logic to handle email change
    };

    const getData = () => {
        
    };

    return (
        <div style={todos.length > 0 && areAllTodosCompleted() ? { width: "200px", border: "solid 2px green"} : { width: "200px", border: "solid 2px red"}}>
            <p>ID: {props.userData.id}</p>
            Name: <input type='text' value={props.userData.name} onChange={handleNameChange} /><br />
            Email: <input type='text' value={props.userData.email} onChange={handleEmailChange} />
            <button onMouseOver={getData}>Other Data</button>
        </div>
    );
}

export default UserComp;
