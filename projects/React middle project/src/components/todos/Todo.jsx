import React from 'react'
import Button from "../UI/Button";
export const TodoComp = ({ todoData, onMarkComplete }) => {
  
  return (
    <div style={{border : "2px solid purple", margin: "10px 5px",padding: "4px 10px"}}>
    <p>Title: {todoData.title}</p>
    <div  style={{ display: "flex",justifyContent: "space-between"  }}>
      <p>Completed: {todoData.completed.toString()}</p>
      {!todoData.completed && <Button
          type="button"
          title="Mark Completed"
          onClick={()=>onMarkComplete(todoData.id)}
      />}
      
    </div>

    
</div>
  )
}
export default TodoComp
