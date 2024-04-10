import { useState ,useEffect} from 'react'

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
        <button onClick={addPostHandler}>Add</button>
      </div>

      <div style={{border : "2px solid black"}}>
        
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
           <button onClick={() => setAddPost(false)}>Cancel</button><button type='submit'>Add</button>
        </form> 
        }
        </div>
      </>
  )
}

export default PostsComp

