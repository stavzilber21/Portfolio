import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectChat } from "../redux/chatSlice";
import "../UI/chats.css"

export const Chats = () => {
  const [chats, setChats] = useState([]);
  const [phoneToNameMap, setPhoneToNameMap] = useState({});

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const handleChatClick = (chat) => {
    dispatch(selectChat(chat)); 
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token")
        const resp = await fetch("http://localhost:3000/chats", {
          method: 'GET',
          headers: { 'x-access-token': token}
        });
      
      const result = await resp.json();
      
      const filterChats = result.filter(ch => ch.participants.includes(user.phone))
        setChats(filterChats);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: { "x-access-token": token },
        });
        const users = await resp.json();
        const map = {};
        users.forEach((user) => {
          map[user.phone] = user.name;
        });
        setPhoneToNameMap(map);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="chats-container">
    {chats.length > 0 ? (
      chats.map((chat) => (
        <Chat
          key={chat.chatId}
          chat={chat}
          userPhone={user.phone}
          phoneToNameMap={phoneToNameMap}
          onSelectChat={handleChatClick}
        />
      ))
    ) : (
      <p>No chats found.</p>
    )}
  </div>
  );
};

export default Chats;
