import React from 'react'
import { useState} from 'react';
import Button from "../UI/Button";


export const AddUserComp = ({onCancel,onAddUser}) => {
  const [newUser, setNewUser] = useState({name: '', email: ''})
  
  const submitHandler = (event) => {
    event.preventDefault();

    const new_user = {
      ...newUser
    };

    setNewUser({name: '', email: ''});
    onAddUser(new_user);
  };

  return (
    <>
    <>Add New User</>
    <div style={{border : "2px solid black", margin: "10px", padding: "6px"}}>
        <form onSubmit={submitHandler}>
            Name: <input type='text' onChange={(e)=>setNewUser({ ...newUser, name: e.target.value })}/><br/>
            Email: <input type='text' onChange={(e)=>setNewUser({ ...newUser, email: e.target.value })}/><br/>
            <Button
                type="button"
                title="Cancel"
                onClick={onCancel}
            />
            <Button
                type="submit"
                title="Add"
            />
         </form> 
    </div>
    </>
  )
}

export default AddUserComp
