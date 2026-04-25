import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import "./App.css";

export default function App() {
  const { isLoggedIn, message, login, logout } = useAuth();

  const [localPosts, setLocalPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const addPost = (newPost) => {
    setLocalPosts([newPost, ...localPosts]);
  };

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const goBack = () => {
    setSelectedPost(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h1>Welcome to Post List App</h1>
          <p>Please log in to continue.</p>



          <button className="login-btn" onClick={login}>
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="top-bar">
        <h1>Post List App</h1>

        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>

      {message && <p className="auth-message">{message}</p>}

      {selectedPost ? (
        <PostDetail post={selectedPost} goBack={goBack} />
      ) : (
        <>
          <PostForm addPost={addPost} />
          <PostList localPosts={localPosts} openPost={openPost} />
        </>
      )}
    </div>
  );
}