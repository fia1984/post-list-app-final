import { memo, useState } from "react";
import { useAuth } from "./context/AuthContext";

function LoginPage({ goToSignup }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("LoginPage rendered");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    login(email);
  };

  return (
    <div className="auth-card">
      <h1>Post List App</h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="primary-button">
          Login
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account?{" "}
        <button type="button" onClick={goToSignup}>
          Sign up
        </button>
      </p>
    </div>
  );
}

export default memo(LoginPage);