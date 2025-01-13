import React, { useState, useEffect , useRef} from "react";
import { useSelector , useDispatch} from "react-redux";
import Message from "./Message";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs"
import RoundedBtn from "./Common/button";
import { MdSearch, MdSend } from "react-icons/md";
import socketService from "../socketService";
import { addMessageToRedux } from "../redux/chatSlice";

export const ChatDetail = () => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const currentUserPhone = useSelector((state) => state.user.user.phone);
  const dispatch = useDispatch();

  // State for user details
  const [userDetails, setUserDetails] = useState({});
  const [typing, setTyping] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!socketService.socket) {
      socketService.connect();
    }

    socketService.on('receiveMessage', (newMessage) => {
      dispatch(addMessageToRedux(newMessage)); 
    });

    return () => {
      socketService.disconnect();
      socketService.off('receiveMessage');
    };
  }, [dispatch]);

  const addMessage = async (msg) => {
    socketService.emit("sendMessage", msg);
  };

  const handleInputSubmit = () => {
    if (inputRef.current.value.length > 0) {
      const numMsg = selectedChat.messages.length + 1
      const newMessage = {
        chatId: selectedChat.chatId,
        messageId: "msg" + numMsg,
        content: inputRef.current.value,
        sender: currentUserPhone,
      };
      
      addMessage(newMessage);
      inputRef.current.value = "";
      inputRef.current.focus();
      setTyping(false);
    }
  };

  const handleEmojiClick = () => {
    inputRef.current.value += "🔥";
    inputRef.current.focus();
  };

  const handleInputChange = () => {
    inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
  };

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

   // Handle case where no chat is selected
   if (!selectedChat) {
    return <p>Please select a chat to view details.</p>;
  }


  // Get the chat title
  const chatTitle =
    selectedChat.type === "group"
      ? selectedChat.name // Group chat name
      : userDetails[
          selectedChat.participants.find((phone) => phone !== currentUserPhone)
        ] || "Chat Details"; // Name of the other participant in personal chat

 
  return (
    <div>
      <div style={{display: "flex"}}>
        <h2>{chatTitle}</h2>
        {/* Buttons */}
        <div>
          <RoundedBtn icon={<MdSearch />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>
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
         {/* Bottom section */}
      <div>
        {/* Emoji btn */}
        <RoundedBtn icon={<BiHappy />} onClick={handleEmojiClick} />

        {/* Upload btn */}
        <span>
          <RoundedBtn icon={<AiOutlinePaperClip />} />
        </span>

        {/* Input bar */}
        <input
          type="text"
          placeholder="Type a message"
          onChange={handleInputChange}
          ref={inputRef}
        />

        {/* Mic/Send btn */}
        <span >
          {typing ? (
            <RoundedBtn icon={<MdSend />} onClick={handleInputSubmit} />
          ) : (
            <RoundedBtn icon={<BsFillMicFill />} />
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatDetail;
