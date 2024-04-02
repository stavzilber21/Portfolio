import React, { useState } from 'react'

export const TodoComp = ({ todoData, onMarkComplete }) => {
  
  return (
    <div style={{border : "2px solid purple", margin: "10px 5px",padding: "4px 10px"}}>
    <p>Title: {todoData.title}</p>
    <p>Completed: {todoData.completed.toString()}</p>
    {!todoData.completed && <button onClick={()=>onMarkComplete(todoData.id)}>Mark Completed</button>}
    
</div>
  )
}
export default TodoComp
