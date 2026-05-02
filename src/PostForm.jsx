import { memo, useState } from "react";

function PostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  console.log("PostForm rendered");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Please enter title and body");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      body,
      userId: 1,
      isLocal: true,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        addPost(newPost);
        setTitle("");
        setBody("");
        setSuccessMessage("Post created successfully");
      })
      .catch((error) => {
        console.log("Error creating post:", error);
      });
  };

  return (
    <div className="post-form">
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
        />

        <button type="submit" className="primary-button">
          Submit Post
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default memo(PostForm);