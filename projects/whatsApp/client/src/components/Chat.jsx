import React from 'react'

export const Chat = ({ pp, contact, msg, time, unreadMsgs, active }) => {
    return (
        // Chat container
        <div
        >
          {/* Profile picture */}
          <img
            src={pp}
            alt="profile_picture"
          />
    
          {/* Info container */}
          <div>
            {/* Contact name and message */}
            <div>
              {/* Contact name */}
              <h1>{contact}</h1>
    
              {/* Message */}
              <p >
                {msg}
              </p>
            </div>
    
            {/* Time and number of messages*/}
            <div>
              {/* Time */}
              <p>{time}</p>
    
              {/* Number of messages */}
              {unreadMsgs && (
                <div>
                  <p >{unreadMsgs}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}
export default Chat