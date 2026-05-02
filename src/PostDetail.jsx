import { memo } from "react";
import PostComments from "./PostComments";

function PostDetail({ post, goBack }) {
  console.log("PostDetail rendered");

  return (
    <div className="post-detail">
      <button onClick={goBack} className="secondary-button">
        Back to Posts
      </button>

      <h2>{post.title}</h2>
      <p>{post.body}</p>

      <PostComments postId={post.id} />
    </div>
  );
}

export default memo(PostDetail);