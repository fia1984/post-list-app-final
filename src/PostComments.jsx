import { useEffect, useState } from "react";

export default function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [localComments, setLocalComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.slice(0, 3));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
        setLoading(false);
      });
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Please enter a comment");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: "You",
      email: "you@example.com",
      body: commentText,
    };

    setLocalComments([newComment, ...localComments]);
    setCommentText("");
  };

  const allComments = [...localComments, ...comments];

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button type="submit">Submit Comment</button>
      </form>

      {loading ? (
        <p className="loading-text">Loading comments...</p>
      ) : (
        <div>
          {allComments.map((comment) => (
            <div className="comment-card" key={comment.id}>
              <h4>{comment.name}</h4>
              <p className="comment-email">{comment.email}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}