import { memo, useEffect, useState } from "react";

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  console.log("PostComments rendered");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
      });
  }, [postId]);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!commentText) {
      alert("Please enter a comment");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: "New Comment",
      email: "user@example.com",
      body: commentText,
    };

    setComments((previousComments) => [newComment, ...previousComments]);
    setCommentText("");
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          placeholder="Write a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button type="submit" className="primary-button">
          Submit Comment
        </button>
      </form>

      {comments.map((comment) => (
        <div className="comment-card" key={comment.id}>
          <h4>{comment.name}</h4>
          <p>{comment.body}</p>
          <small>{comment.email}</small>
        </div>
      ))}
    </div>
  );
}

export default memo(PostComments);