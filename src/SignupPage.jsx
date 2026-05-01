import { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function SignupPage({ goToLogin }) {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Sign Up button clicked");

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    signup(name, email);
  };

  return (
    <div className="auth-card">
      <h2>Create a new account</h2>
      <p className="auth-subtitle">It's quick and easy.</p>

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
        placeholder="Create your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" className="signup-btn" onClick={handleSignup}>
        Sign Up
      </button>

      <p className="switch-auth">
        Already have an account?{" "}
        <button type="button" onClick={goToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}