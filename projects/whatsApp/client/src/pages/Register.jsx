import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import styles from '../UI/register.module.css';  

export const Register = () => {
  const navigate = useNavigate();

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to the server.");
      }

      const result = await response.json();

      if (!result.success) {
        alert(result.message || "Registration failed.");
      } else {
        alert("Registration successful!");
        navigate('/home');
      }
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while trying to register. Please try again.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <p className={styles.title}>Registration Form</p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          placeholder="Full Name"
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}

        <input
          type="email"
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Email"
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <input
          type="password"
          {...register("password", { 
            required: "Password is required", 
            minLength: { value: 6, message: "Password must be at least 6 characters long" },
          })}
          placeholder="Password"
        />
        {errors.password && <span className={styles.error}>{errors.password.message}</span>}

        <input
          type="text"
          {...register("phone", { 
            required: "Phone number is required", 
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
          placeholder="Phone Number"
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}

        <button type="submit" className={styles.submitBtn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
