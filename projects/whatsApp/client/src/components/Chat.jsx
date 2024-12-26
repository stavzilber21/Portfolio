import React from "react";

function Chat({ chat, userPhone , phoneToNameMap, onSelectChat }) {
  const { messages, unreadMessages } = chat;

  const handleClick = () => {
    onSelectChat(chat);
  };

  
  const contactName =
    chat.type === "group"
      ? chat.name
      : chat.participants
          .filter((p) => p !== userPhone)
          .map((phone) => phoneToNameMap[phone] || phone)
          .join(", ");

  const lastMessage = messages?.[messages.length - 1];

  return (
    <div
    onClick={handleClick}
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "5px",
        cursor: "pointer",
      }}
    >
      <h3>{contactName}</h3>
      {lastMessage && (
        <p>
          <strong>{lastMessage.sender === userPhone ? "You" : phoneToNameMap[lastMessage.sender] || lastMessage.sender}:</strong>{" "}
          {lastMessage.content}
        </p>
      )}
      {lastMessage && (
        <p>Time: {new Date(lastMessage.timestamp).toLocaleTimeString()}</p>
      )}
      {unreadMessages[userPhone] > 0 && <p>Unread messages: {unreadMessages[userPhone]}</p>}
    </div>
  );
}

export default Chat;
