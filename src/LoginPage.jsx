import { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function LoginPage({ goToSignup }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }

    setErrorMessage("");
    login(email);
  };

  return (
    <div className="auth-page">
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

          <button type="submit">Login</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>
          Don&apos;t have an account?{" "}
          <button className="link-button" onClick={goToSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}