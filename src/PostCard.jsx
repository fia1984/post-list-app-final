export default function PostCard({ post, openPost }) {
  return (
    <article className="post-list-card">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <button type="button" onClick={() => openPost(post)}>
        View Details
      </button>
    </article>
  );
}