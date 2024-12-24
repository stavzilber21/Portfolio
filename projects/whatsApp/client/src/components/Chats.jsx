import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { useSelector } from "react-redux";

export const Chats = () => {
  const [chats, setChats] = useState([]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token")
        const resp = await fetch("http://localhost:3000/chats", {
          method: 'GET',
          headers: { 'x-access-token': token}
        });
      
      const result = await resp.json();
      
      console.log(result);
      console.log(user.phone);
      const filterChats = result.filter(ch => ch.participants.includes(user.phone))
      console.log(filterChats);
        setChats(filterChats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <div>
      {chats.length > 0 ? (
        chats.map((chat, i) => (
          <Chat key={i} chat={chat} userPhone={user.phone} />
        ))
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
};

export default Chats;
