import React from 'react'
import RoundedBtn from "./common/RoundedBtn";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import { pp } from "../assets/whatsapp";

export const LeftMenu = () => {
  return (
    <div className='flex flex-col border-r border-neutral-700 w-100 h-screen' >
        <div className='justify-between items-center bg-[#202d33] h-[60px] p-3'>
        <img src={pp} alt="profile_picture" className="rounded-full w-[40px]" />
            {/* Profile nav buttons */}
            <div className="flex justify-between w-[175px]">
            <RoundedBtn icon={<MdPeopleAlt />} />
            <RoundedBtn icon={<TbCircleDashed />} />
            <RoundedBtn icon={<BsFillChatLeftTextFill />} />
            <RoundedBtn icon={<HiDotsVertical />} />
            </div>
        </div>
    </div>
  )
}
export default LeftMenu
