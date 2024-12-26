import React from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userActions } from '../redux/userSlice';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
// } = useForm();
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    email: "stavzilber@gmail.com",
    password: "stav2000",
  },
});

const onSubmit = async (data) => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const result = await response.json();

    //Saving the token in the localStorage
    localStorage.setItem('token', result.token);
    console.log(result.message);
    
    //Saving user information in Redux
    dispatch(userActions.load(result.user));

    navigate('/home')
  } catch (error) {
    console.error(error.message);
    alert("Login failed: " + result.message);
  }
};
  return (
    <div>
      <p className="title">Login Form</p>
      <form className="App" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}

        <button type="submit" style={{ backgroundColor: "#a1eafb" }}>
          Login
        </button>
        New user? <Link to="/register">Register Page</Link>
      </form>
    </div>
  )
}
export default Login