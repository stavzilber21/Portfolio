import React, { useState } from "react";
import RoundedBtn from "./Common/button";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineSearch } from 'react-icons/ai';
import { pp } from "../assets/whatsapp";
import Chats from "./Chats";
import styles from "../UI/LeftMenu.module.css";

export const LeftMenu = () => {
  const [filter, setFilter] = useState(false);

  return (
    <div className={styles.leftMenu}>
      <div className={styles.profileNav}>
        <img src={pp} alt="profile_picture" className={styles.profilePicture} />
        <div className={styles.navButtons}>
          <RoundedBtn icon={<MdPeopleAlt />} />
          <RoundedBtn icon={<TbCircleDashed />} />
          <RoundedBtn icon={<BsFillChatLeftTextFill />} />
          <RoundedBtn icon={<HiDotsVertical />} />
        </div>
      </div>
      <div className={styles.searchFilter}>
        <input type="text" placeholder="Search or start a new chat" />
           <span className={styles.roundedBtn}>
              <RoundedBtn icon={<AiOutlineSearch  onClick={() => setFilter(!filter)}/> } />
          </span>
      </div>
      <div className={styles.chatsContainer}>
        <Chats filter={filter} />
      </div>
    </div>
  );
};

export default LeftMenu;
