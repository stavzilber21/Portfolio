import { useState ,useEffect} from 'react'
import Button from "../UI/Button";
import PostComp from "./Post";


export const PostsComp = ({ posts,postsLen, userId,onAddPost}) => {
  const [addPost, setAddPost] = useState(false)
   const [userIdClicked, setUserIdClicked] = useState(0);
   const [post, setPost] = useState({title: '', body: ''})
    
   useEffect(() => {
    if (userId !== userIdClicked) {
      setAddPost(false);
    }
  }, [userId]);

  const addPostHandler = () => {
    setAddPost(true);
    setUserIdClicked(userId);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newPost = {
      userId,
      id: postsLen+1,
      title: post.title,
      body: post.body
    };

    setPost({title: '', body: ''});
    setAddPost(false);
    onAddPost(newPost);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Posts - User {userId}</p>
        <Button
          type="button"
          title="Add"
          onClick={addPostHandler}
      />
      </div>

      <div style={!addPost ? {border: "2px solid black", overflowY: "scroll", maxHeight: "250px"} : {border: "2px solid black", padding: "10px"}}>
        
        { !addPost &&
          posts.map((post) =>
          {
            
              return <PostComp key={post.id} postData={post} />
          })
        }
        { addPost &&
           <form onSubmit={submitHandler}>
           Title: <input type='text' onChange={(e)=>setPost({ ...post, title: e.target.value })}/><br/>
           Body: <input type='text' onChange={(e)=>setPost({ ...post, body: e.target.value })}/><br/>
           <Button
                type="button"
                title="Cancel"
                onClick={() => setAddPost(false)}
            />
            <Button
                type="submit"
                title="Add"
            />
        </form> 
        }
        </div>
      </>
  )
}

export default PostsComp

