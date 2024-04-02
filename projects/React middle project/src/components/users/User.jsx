import { useState} from 'react';
import OtherDataComp from './OtherData';
// import './UserComp.css';



function UserComp({backgnd,userData,onUpdate,onDelete,onIdSelect,frame}) {
    const [showOtherData, setShowOtherData] = useState(false); 
    const [name, setName] = useState(userData.name); 
    const [email, setEmail] = useState(userData.email);
    
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
        const newUser = {id: userData.id, name: name, email: email};
        onUpdate(newUser);
    };

    const deleteUser = () => {
        onDelete(userData.id);
    };

    const selectUser = (id) => {
        onIdSelect(id);
    };

    return (
            <div style={{ width: "290px", border: `2px solid ${frame}`, margin: "6px", padding: "6px", backgroundColor: backgnd} }>
                <div onClick={()=>selectUser(userData.id)}>ID: {userData.id}</div>
                Name: <input type='text' defaultValue={userData.name} onChange={e=>handleNameChange(e)} /><br />
                Email: <input type='text' defaultValue={userData.email} onChange={e=>handleEmailChange(e)} />
                <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Other Data</button>
                {showOtherData && <OtherDataComp userData={userData} />} 
                <button onClick={updateData}>Update</button>
                <button onClick={deleteUser}>Delete</button>
           
        </div>
        
    );
}

export default UserComp;
