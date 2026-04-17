import { useState } from "react";
import "./App.css";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetail from "./PostDetail";

export default function App() {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);

  const addPost = (newPost) => {
    setLocalPosts((prev) => [newPost, ...prev]);
  };

  const openPost = (id) => {
    setSelectedPostId(id);
  };

  const goBack = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="app">
      <h1>Post List Assignment Project</h1>

      {selectedPostId ? (
        <PostDetail postId={selectedPostId} goBack={goBack} />
      ) : (
        <>
          <PostForm addPost={addPost} />
          <PostList localPosts={localPosts} openPost={openPost} />
        </>
      )}
    </div>
  );
}