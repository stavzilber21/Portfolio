import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const LogOut = () => {
    const userString = sessionStorage.getItem("data");
    const user = JSON.parse(userString);
    const username = user.username;
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
        navigate('/');
      }, [user]);
  return (
    <div>

    </div>
  )
}
export default LogOut
