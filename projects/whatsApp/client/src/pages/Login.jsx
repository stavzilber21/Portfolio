import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userActions } from '../redux/userSlice';
import styles from '../UI/login.module.css';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
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
      localStorage.setItem('token', result.token);
      dispatch(userActions.load(result.user));
      navigate('/home');
    } catch (error) {
      console.error(error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <p className={styles.title}>Login</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.input}
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}

          <input
            className={styles.input}
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}

          <button type="submit" className={styles.button}>Login</button>
          <Link to="/register" className={styles.link}>New user? Register here</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
