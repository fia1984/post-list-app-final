import { useState } from "react";

export default function PostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmitPost = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please enter post title and post body");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      body: body,
      isLocal: true,
    };

    addPost(newPost);
    setTitle("");
    setBody("");
  };

  return (
    <section className="card">
      <h2>Create New Post</h2>

      <form className="post-form" onSubmit={handleSubmitPost}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button type="submit" className="success-btn">
          Submit Post
        </button>
      </form>
    </section>
  );
}