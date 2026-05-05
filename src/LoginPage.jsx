import { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function LoginPage({ goToSignup }) {
  const { login, message, messageType } = useAuth();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim() || !password.trim()) {
      alert("Please enter name and password");
      return;
    }

    login(name);
  };

  return (
    <main className="auth-page">
      <section className="auth-info">
        <h1>Post List App</h1>
        <p>Connect with posts, comments, and people around your learning world.</p>
      </section>

      <section className="auth-card">
        <h2>Login</h2>
        <p>Welcome back to your post app.</p>

        {message && messageType !== "logout" && (
          <div className={`message-box ${messageType}`}>{message}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <div className="auth-switch">
          <span>New user?</span>
          <button type="button" onClick={goToSignup}>
            Create new account
          </button>
        </div>
      </section>
    </main>
  );
}