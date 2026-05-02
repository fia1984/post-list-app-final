import { memo, useState } from "react";
import { useAuth } from "./context/AuthContext";

function SignupPage({ goToLogin }) {
  const { signup } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const handleSignup = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    signup(email);
  };

  return (
    <div className="auth-card">
      <h1>Post List App</h1>
      <h2>Create a new account</h2>
      <p className="subtitle">It's quick and easy.</p>

      <form onSubmit={handleSignup}>
        <div className="name-row">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Mobile number or email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="primary-button signup-button">
          Sign Up
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{" "}
        <button type="button" onClick={goToLogin}>
          Login
        </button>
      </p>
    </div>
  );
}

export default memo(SignupPage);