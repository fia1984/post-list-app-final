import { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function SignupPage({ goToLogin }) {
  const { signup, message, messageType } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    signup(name, email);
  };

  return (
    <main className="auth-page">
      <section className="auth-info">
        <h1>Post List App</h1>
        <p>Connect with posts, comments, and people around your learning world.</p>
      </section>

      <section className="auth-card">
        <h2>Create a new account</h2>
        <p>It is quick and easy.</p>

        {message && messageType !== "logout" && (
          <div className={`message-box ${messageType}`}>{message}</div>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="success-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-switch">
          <span>Already have an account?</span>
          <button type="button" onClick={goToLogin}>
            Login
          </button>
        </div>
      </section>
    </main>
  );
}