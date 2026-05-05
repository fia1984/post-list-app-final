import "./App.css";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostDetail from "./PostDetail";

export default function App() {
  const {
    isLoggedIn,
    loggedInUser,
    logout,
    message,
    messageType,
    clearMessage,
  } = useAuth();

  const [authPage, setAuthPage] = useState("login");
  const [localPosts, setLocalPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoggedIn, selectedPost, currentPage]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  const addPost = (newPost) => {
    setLocalPosts([newPost, ...localPosts]);
    setCurrentPage("home");
  };

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const goBack = () => {
    setSelectedPost(null);
  };

  const handleLogout = () => {
    logout();
    setSelectedPost(null);
    setCurrentPage("home");
    setAuthPage("login");
  };

  if (!isLoggedIn) {
    return (
      <>
        {message && (
          <div className={`auth-message ${messageType}`}>
            <span>{message}</span>

            <button
              type="button"
              className="message-close-btn"
              onClick={clearMessage}
              aria-label="Close message"
            >
              ×
            </button>
          </div>
        )}

        {authPage === "login" ? (
          <LoginPage goToSignup={() => setAuthPage("signup")} />
        ) : (
          <SignupPage goToLogin={() => setAuthPage("login")} />
        )}
      </>
    );
  }

  return (
    <div className="app">
      {message && (
        <div className={`auth-message ${messageType}`}>
          <span>{message}</span>

          <button
            type="button"
            className="message-close-btn"
            onClick={clearMessage}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      <header className="app-header">
        <div>
          <h1>Post List App</h1>
          <p>Welcome, {loggedInUser?.name}</p>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="nav-button"
            onClick={() => {
              setCurrentPage("home");
              setSelectedPost(null);
            }}
          >
            Home
          </button>

          <button
            type="button"
            className="nav-button"
            onClick={() => {
              setCurrentPage("create");
              setSelectedPost(null);
            }}
          >
            Create Post
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        {selectedPost ? (
          <PostDetail post={selectedPost} goBack={goBack} />
        ) : currentPage === "create" ? (
          <PostForm addPost={addPost} />
        ) : (
          <PostList localPosts={localPosts} openPost={openPost} />
        )}
      </main>
    </div>
  );
}