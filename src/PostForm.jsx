import { useState } from "react";

export default function PostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert("Please fill in both title and body");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: title,
      body: body,
    };

    addPost(newPost);
    setTitle("");
    setBody("");
  };

  return (
    <div className="form-box">
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
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
        ></textarea>

        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}