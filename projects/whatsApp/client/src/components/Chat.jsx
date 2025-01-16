import React from "react";
import "../UI/chatItem.css"

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
      className={`chat-container ${chat.selected ? "selected" : ""}`}
    >
      <div className="chat-details-left">
        <h3>{contactName}</h3>
        {lastMessage && (
          <div className="last-message">
            <p>{lastMessage.content}</p>
          </div>
        )}  
      </div>
      <div className="chat-details-right">
      {lastMessage && (
          <p className="time">
          {new Date(lastMessage.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}
        </p>
        
        
        )}
      {unreadMessages[userPhone] > 0 && (
        <div className="unread-badge">
          {unreadMessages[userPhone]}
        </div>
      )}
      </div>
      
    </div>
  );
}

export default Chat;
