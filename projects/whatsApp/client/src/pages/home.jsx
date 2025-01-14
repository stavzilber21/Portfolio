import React from 'react'
import LeftMenu from '../components/LeftMenu'
import ChatDetail from '../components/ChatDetail'
import '../UI/home.css'

export const Home = () => {
  return (
    <div className='container'>
      <div className='sidebar'>
        <LeftMenu />
      </div>
      <div className='chat-window'>
        <ChatDetail />
      </div>
    </div>
  )
}
export default Home
