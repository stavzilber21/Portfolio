import React from 'react';
import { useSelector } from "react-redux";
import styles from '../UI/message.module.css';

const Message = ({ content, time, sender, userDetails,chatType}) => {
  const senderName = userDetails[sender] || sender;
  const user = useSelector((state) => state.user.user);
  const userName = user.name;
  const isSentByUser = senderName === userName;

  const getSenderName = (senderPhone) => {
    if (chatType === "group" && senderPhone !== user.phone) {
      return userDetails[senderPhone] || "Unknown";
    }
    return "";  
  };

  return (
    <div className={`${styles["message-container"]} ${isSentByUser ? styles.sent : styles.received}`}>
      <div className={styles["message-wrapper"]}>
      <div className={styles["message-content"]}>
        {chatType === "group" && sender !== user.phone && (
          <p className={styles["message-sender"]}>{getSenderName(sender)}</p>
        )}
         <div className={styles["message-text-time-wrapper"]}>
            <p className={styles["message-text"]}>
              {content}
            </p>
            <p className={styles["message-time"]}>
              {new Date(time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}
            </p>
         </div>
        
      </div>

      </div>
    </div>
  );
};
export default Message