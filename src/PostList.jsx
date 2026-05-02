import { memo, useEffect, useState } from "react";
import PostCard from "./PostCard";

function PostList({ localPosts, openPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("PostList rendered");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const allPosts = [...localPosts, ...posts];

  return (
    <div>
      <h2>All Posts</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="post-list">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} openPost={openPost} />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(PostList);