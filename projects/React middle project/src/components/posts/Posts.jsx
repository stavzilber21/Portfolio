import { useState ,useEffect} from 'react'
import axios from 'axios';
import PostComp from "./Post";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const PostsComp = (props) => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
        async function getData() {
            let resp = await axios.get(`${POSTS_URL}?userId=${props.id}`);
            setPosts(resp.data);
        }
        getData();
    }, [props.id]);
  return (
    <div style={{border : "2px solid black"}}>
       
       {
        posts.map((post) =>
        {
           
            return <PostComp key={post.id} postData={post} />
        })
      }
      </div>
  )
}

export default PostsComp

