import React from 'react'

export const PostComp = (props) => {
  return (
    <div style={{border : "2px solid purple", margin: "10px 5px", padding: "4px 10px"}}>
    <p>Title: {props.postData.title}</p>
    <p>Body: {props.postData.body}</p>
    
</div>
  )
}
export default PostComp
