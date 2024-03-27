import { useState, useEffect } from 'react';
import axios from 'axios';
import OtherDataComp from './OtherData';

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function UserComp(props) {
    const [todos, setTodos] = useState([]);
    const [showOtherData, setShowOtherData] = useState(false); 
    const [name, setName] = useState(props.userData.name); 
    const [email, setEmail] = useState(props.userData.email);

    useEffect(() => {
        async function getData() {
            let resp = await axios.get(`${TODOS_URL}?userId=${props.userData.id}`);
            setTodos(resp.data);
        }
        getData();
        // setDataUpdated(false);
    }, [props.userData.id]);


    // Function to check if all todos are completed
    const areAllTodosCompleted = () => {
        if (todos.length === 0) {
            return false; // If todos is empty, assume not all todos completed
        }
        const todosNotCompleted = todos.filter(todo => !todo.completed);
        return todosNotCompleted.length === 0;
    };

    
    const handleNameChange = (event) => {
        setName(event.target.value); 
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value); 
    };

    const handleMouseOver = () => {
        setShowOtherData(true); 
    };

    const handleMouseOut = () => {
        setShowOtherData(false); 
    };

    const updateData = () => {
        const newUser = {id: props.userData.id, name: name, email: email};
        props.onUpdate(newUser);
    };

    const deleteUser = () => {
        props.onDelete(props.userData.id);
    };

    return (
        <div style={todos.length > 0 && areAllTodosCompleted() ? { width: "290px", border: "solid 2px green",margin: "6px", padding: "6px"} : { width: "290px", border: "solid 2px red",margin: "6px", padding: "6px"}}>
            ID: {props.userData.id}<br />
            Name: <input type='text' defaultValue={props.userData.name} onChange={e=>handleNameChange(e)} /><br />
            Email: <input type='text' defaultValue={props.userData.email} onChange={e=>handleEmailChange(e)} />
            <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Other Data</button>
            {showOtherData && <OtherDataComp userData={props.userData} />} 
            <button onClick={updateData}>Update</button>
            <button onClick={deleteUser}>Delete</button>
        </div>
    );
}

export default UserComp;
