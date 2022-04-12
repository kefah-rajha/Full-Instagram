import { useState, useEffect } from "react";
import axios from "axios";

function PostAccount({ id }) {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    if (id) {
      const res = await axios.post("/api/posts/mypost", { id });
      console.log(res.data.posts);
      setPosts(res.data.posts);
    }
  }, [id]);
  console.log(id);
  return (
    <div>
      {!posts.length ? (
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

export default PostAccount;
