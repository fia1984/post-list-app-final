export default function PostCard({ post, openPost }) {
    return (
      <div className="post-card">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
  
        <button onClick={() => openPost(post.id)}>View Details</button>
      </div>
    );
  }