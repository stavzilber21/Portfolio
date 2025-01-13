import React, { useState } from "react";
import RoundedBtn from "./Common/button";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../assets/whatsapp";
import Chats from "./Chats";


export const LeftMenu = () => {
    const [filter, setFilter] = useState(false);

  return (
    // LeftMenu container
    <div>
      {/* Profile nav */}
      <div style={{display: "flex"}}>
        {/* Profile picture */}
        <img src={pp} alt="profile_picture" style={{width: 40}}/>

        {/* Profile nav buttons */}
        <div >
          <RoundedBtn icon={<MdPeopleAlt />} />
          <RoundedBtn icon={<TbCircleDashed />} />
          <RoundedBtn icon={<BsFillChatLeftTextFill />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>

      {/* Search and filter */}
      <div>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search or start a new chat"
        />

        {/* Filter button */}
        <button
          onClick={() => setFilter(!filter)}
        >
          <BiFilter />
        </button>
      </div>

      {/* Chats */}
      <Chats filter={filter} />
    </div>
  )
}



export default LeftMenu;
