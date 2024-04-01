import React from 'react'

export const TodoComp = (props) => {
  return (
    <div style={{border : "2px solid purple", margin: "10px 5px",padding: "4px 10px"}}>
    <p>Title: {props.todoData.title}</p>
    <p>Completed: {props.todoData.completed.toString()}</p>
    
</div>
  )
}
export default TodoComp
