import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostDetail from "./PostDetail";

export default function App() {
  const { isLoggedIn, loggedInUser, logout, message, messageType } = useAuth();

  const [authPage, setAuthPage] = useState("login");
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
    return authPage === "login" ? (
      <LoginPage goToSignup={() => setAuthPage("signup")} />
    ) : (
      <SignupPage goToLogin={() => setAuthPage("login")} />
    );
  }

  return (
    <div className="app-container">
      <div className="top-bar">
        <div>
          <h1>Post List App</h1>
          <p className="welcome-text">Welcome, {loggedInUser}</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {message && (
        <p
          className={
            messageType === "error" ? "error-message" : "success-message"
          }
        >
          {message}
        </p>
      )}

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