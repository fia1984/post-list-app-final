import { useEffect, useState } from "react";

export default function PostDetail({ post, goBack }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!post) return;

    if (post.id > 100) {
      setComments([]);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.log("Error fetching comments:", error));
  }, [post]);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Please write a comment");
      return;
    }

    const newComment = {
      id: Date.now(),
      name: "You",
      email: "you@example.com",
      body: commentText,
      isLocal: true,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <>
      <section className="card post-detail-card">
        <button className="back-btn" onClick={goBack}>
          Back to Posts
        </button>

        <h2>{post.isLocal ? "Your New Post" : "Post Title"}</h2>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </section>

      <section className="card comment-form-card">
        <h2>Comments</h2>

        <form onSubmit={handleSubmitComment}>
          <textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <button type="submit" className="success-btn">
            Submit Comment
          </button>
        </form>
      </section>

      <section className="comments-list">
        {comments.length === 0 ? (
          <article className="comment-card">
            <p className="comment-body">No comments yet. Be the first to comment.</p>
          </article>
        ) : (
          comments.map((comment) => (
            <article className="comment-card" key={comment.id}>
              <h3>{comment.name}</h3>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-email">{comment.email}</p>

              {comment.isLocal && <p className="comment-time">Just now</p>}
            </article>
          ))
        )}
      </section>
    </>
  );
}