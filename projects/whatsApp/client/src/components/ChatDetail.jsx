import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export const ChatDetail = () => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const currentUserPhone = useSelector((state) => state.user.user.phone);

  // State for user details
  const [userDetails, setUserDetails] = useState({});

  // Fetch user details when selectedChat changes
  useEffect(() => {
    if (!selectedChat || !selectedChat.chatId) {
      return; // Don't fetch if selectedChat is not defined
    }

    const fetchChatDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/chats/chat/${selectedChat.chatId}`);
        const usersInChat = await response.json();
        // Map phone numbers to user names
        const userMap = usersInChat.reduce((acc, user) => {
          acc[user.phone] = user.name; // Create a map of phone to name
          return acc;
        }, {});

        setUserDetails(userMap); // Save user details in state
      } catch (error) {
        console.error("Failed to fetch chat details:", error);
      }
    };

    fetchChatDetails();
  }, [selectedChat]);

  // Get the chat title
  const chatTitle =
    selectedChat.type === "group"
      ? selectedChat.name // Group chat name
      : userDetails[
          selectedChat.participants.find((phone) => phone !== currentUserPhone)
        ] || "Chat Details"; // Name of the other participant in personal chat

  // Handle case where no chat is selected
  if (!selectedChat) {
    return <p>Please select a chat to view details.</p>;
  }

  return (
    <div>
      <h2>{chatTitle}</h2>
      <div>
        {selectedChat.messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            time={message.timestamp}
            sender={message.sender}
            userDetails={userDetails} // Pass the phone-to-name mapping
          />
        ))}
      </div>
    </div>
  );
};

export default ChatDetail;
