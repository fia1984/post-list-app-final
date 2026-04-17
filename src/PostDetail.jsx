import { useEffect, useState } from "react";
import PostComments from "./PostComments";

export default function PostDetail({ postId, goBack }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching post details:", error);
        setLoading(false);
      });
  }, [postId]);

  if (loading) {
    return <p>Loading post details...</p>;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="detail-box">
      <button className="back-btn" onClick={goBack}>
        Back to Posts
      </button>

      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <PostComments postId={postId} />
    </div>
  );
}