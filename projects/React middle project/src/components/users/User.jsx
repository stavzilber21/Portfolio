import { useState} from 'react';
import OtherDataComp from './OtherData';
import Button from "../UI/Button";




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
                <button style={{
                    borderRadius: "0px",
                    backgroundColor: "gray",
                    padding: '5px 7px',
                    margin: '3px',
                    marginRight: '30px'
                }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Other Data</button>
                {showOtherData && <OtherDataComp userData={userData} />} 
                <Button
                    type="button"
                    title="Update"
                    onClick={updateData}
                />
                <Button
                    type="button"
                    title="Delete"
                    onClick={deleteUser}
                />

           
        </div>
        
    );
}

export default UserComp;
