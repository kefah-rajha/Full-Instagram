import {useEffect,useState} from 'react'
import axios from 'axios'

function ALLPost({user}) {
    const [posts, setPosts] = useState([]);

useEffect(async()=>{
    if(user){
        const followings =user
        const resAllPost=await axios.post("api/posts/myallpost",followings)
        setPosts(resAllPost.data.allposts);
    
        console.log(resAllPost)
    }
  


},[user])
  return ( <div>
    {!posts?.length ? (
      <div>No Posts</div>
    ) : (
      posts.map((post) => {
        return (
          <div>
            <p>{post.createdAt}</p>
            {post.images.map((image) => {
              return (
                <img
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                  src={image}
                />
              );
            })}
          </div>
        );
      })
    )}
  </div>
);
}

export default ALLPost