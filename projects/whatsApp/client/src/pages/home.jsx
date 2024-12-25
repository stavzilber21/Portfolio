import React from 'react'
import LeftMenu from '../components/LeftMenu'
import ChatDetail from '../components/ChatDetail'

export const Home = () => {
  return (
    <div >
          {/* 2 components cointainer */}
      <div style={{"display": "flex"}}>
        <div>
          <LeftMenu />
        </div>
        <div>
          <ChatDetail />
        </div>
      </div>
    </div>
  )
}
export default Home
