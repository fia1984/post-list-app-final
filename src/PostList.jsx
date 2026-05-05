import { useEffect, useState } from "react";
import PostCard from "./PostCard";

export default function PostList({ localPosts, openPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  const allPosts = [...localPosts, ...posts];

  return (
    <section className="posts-section">
      <h2>All Posts</h2>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="posts-list">
          {allPosts.map((post) => (
            <PostCard key={post.id} post={post} openPost={openPost} />
          ))}
        </div>
      )}
    </section>
  );
}