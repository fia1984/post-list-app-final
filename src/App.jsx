import "./App.css";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostDetail from "./PostDetail";

export default function App() {
  const { isLoggedIn, loggedInUser, logout, message, messageType } = useAuth();

  const [authPage, setAuthPage] = useState("login");
  const [activePage, setActivePage] = useState("posts");
  const [localPosts, setLocalPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoggedIn, activePage, selectedPost]);

  const addPost = (newPost) => {
    setLocalPosts([newPost, ...localPosts]);
    setActivePage("posts");
    setSelectedPost(null);
  };

  const openPost = (post) => {
    setSelectedPost(post);
  };

  const goBack = () => {
    setSelectedPost(null);
  };

  const goToPosts = () => {
    setActivePage("posts");
    setSelectedPost(null);
  };

  const goToCreatePost = () => {
    setActivePage("create");
    setSelectedPost(null);
  };

  const handleLogout = () => {
    logout();
    setAuthPage("login");
    setActivePage("posts");
    setSelectedPost(null);
  };

  const userName =
    typeof loggedInUser === "string"
      ? loggedInUser
      : loggedInUser?.name || "Sammy";

  if (!isLoggedIn) {
    return (
      <>
        {authPage === "login" ? (
          <LoginPage goToSignup={() => setAuthPage("signup")} />
        ) : (
          <SignupPage goToLogin={() => setAuthPage("login")} />
        )}
      </>
    );
  }

  return (
    <div className="app-page">
      <header className="app-header">
        <div>
          <h1>PostBook</h1>
          <p>Facebook-style post app</p>
        </div>

        <nav className="header-actions">
          {activePage === "posts" ? (
            <button className="nav-button" onClick={goToCreatePost}>
              Create Post
            </button>
          ) : (
            <button className="nav-button" onClick={goToPosts}>
              Posts List
            </button>
          )}

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      {message && (
        <div className={`auth-message ${messageType}`}>
          <span>{message}</span>
        </div>
      )}

      {activePage === "posts" && !selectedPost && (
        <section className="welcome-card compact-welcome">
          <div className="welcome-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2>{userName}</h2>
            <p>Welcome back to your post app.</p>
          </div>
        </section>
      )}

      <main className="main-content">
        {selectedPost ? (
          <PostDetail post={selectedPost} goBack={goBack} />
        ) : activePage === "create" ? (
          <PostForm addPost={addPost} />
        ) : (
          <PostList localPosts={localPosts} openPost={openPost} />
        )}
      </main>
    </div>
  );
}