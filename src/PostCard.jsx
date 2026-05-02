import { memo } from "react";

function PostCard({ post, openPost }) {
  console.log("PostCard rendered:", post.id);

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <button onClick={() => openPost(post)} className="secondary-button">
        View Details
      </button>
    </div>
  );
}

export default memo(PostCard);