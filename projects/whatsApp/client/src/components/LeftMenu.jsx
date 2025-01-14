import React, { useState } from "react";
import RoundedBtn from "./Common/button";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineSearch } from 'react-icons/ai';
import { pp } from "../assets/whatsapp";
import Chats from "./Chats";
import "../UI/leftMenu.css"

export const LeftMenu = () => {
    const [filter, setFilter] = useState(false);

    return (
          <div className="left-menu">
            <div className="profile-nav">
              <img src={pp} alt="profile_picture" />
              <h4>Chats</h4>
              <div className="nav-buttons">
                <RoundedBtn icon={<MdPeopleAlt />} />
                <RoundedBtn icon={<TbCircleDashed />} />
                <RoundedBtn icon={<BsFillChatLeftTextFill />} />
                <RoundedBtn icon={<HiDotsVertical />} />
              </div>
            </div>
            <div className="search-filter">
              <input type="text" placeholder="Search or start a new chat" />
              <button onClick={() => setFilter(!filter)}>
                <AiOutlineSearch />
              </button>
            </div>
            <div className="chats-container">
              <Chats filter={filter} />
            </div>
      </div>

  )
}



export default LeftMenu;
