import React from 'react'
import { useSelector } from "react-redux";

export const Message = ({content,time,sender,userDetails}) => {

    const senderName = userDetails[sender] || sender;
    const user = useSelector((state) => state.user.user);
    const userName = user.name;
  return (
    <div>
      <p>
        <strong>{senderName === userName ? "You" :senderName}: </strong> 
        {content}
        {" "}
        {new Date(time).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })}
        </p>
    </div>
  )
}
export default  Message