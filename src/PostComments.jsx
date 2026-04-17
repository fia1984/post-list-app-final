import { useEffect, useState } from "react";

export default function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching comments:", error);
        setLoading(false);
      });
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    const commentToAdd = {
      id: Date.now(),
      name: "You",
      body: newComment,
      email: "you@example.com",
    };

    setComments((prev) => [commentToAdd, ...prev]);
    setNewComment("");
  };

  return (
    <div className="comments-box">
      <h3>Comments</h3>

      <div className="comment-form">
        <textarea
          placeholder="Write your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button onClick={handleAddComment}>Submit Comment</button>
      </div>

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
          </div>
        ))
      )}
    </div>
  );
}