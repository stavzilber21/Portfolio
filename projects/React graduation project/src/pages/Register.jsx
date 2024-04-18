import React, { useState } from 'react';
import { add } from '../firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
useNavigate

export const Register = () => {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [username, setUserName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [checked, setChecked] =useState(false); 

    const navigate = useNavigate();


    const handleChange=(e)=> {
        setChecked(e.target.checked);
    }
      
      const clearForm = () => { 
        setFirstName(""); 
        setLastName(""); 
        setUserName(""); 
        setPassword(""); 
        setChecked(false);
      }; 
      
      const handleSubmit = (e) => { 
        e.preventDefault(); 
        const newUser = { firstName: firstName, lastName:lastName,username:username, password:password, allowOrders:checked, role: "user" }
        //Add the user to firebase
        add("users",newUser); 
        clearForm(); 
        navigate('/user');
      }; 
  return (
    <div>
         <form onSubmit={handleSubmit}> 
         <h2>New User Registeration</h2> 
         <div className="Field"> 
           <label>First name:</label> <br/>
           <input 
             value={firstName} 
             onChange={(e) => { 
               setFirstName(e.target.value); 
             }} 
           /> 
         </div> 
         <div className="Field"> 
           <label>Last name:</label> <br/>
           <input 
             value={lastName} 
             onChange={(e) => { 
               setLastName(e.target.value); 
             }} 
           /> 
         </div> 
         <div className="Field"> 
           <label>User Name:</label> <br/>
           <input 
             value={username} 
             onChange={(e) => { 
                setUserName(e.target.value); 
             }} 
           /> 
         </div> 
         <div className="Field"> 
           <label>Password:</label> <br/>
           <input 
             value={password} 
             type="password" 
             onChange={(e) => { 
               setPassword(e.target.value ); 
             }} 
           /> 

         </div> 
         <div className="Field"> 
            <input value = {checked} type = "checkbox" onChange = {handleChange} />
            <span>Allow others to see my orders</span>
         </div> 
         <button type="submit">Create
         </button> 
        
     </form> 
    </div>
  )
}
export default Register
