import { useAuth } from "./context/AuthContext.jsx";

export default function AuthHeader() {
  const { message, login, logout } = useAuth();

  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={login}
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Login
        </button>

        <button
          onClick={logout}
          style={{ cursor: "pointer" }}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Logout
        </button>
      </div>

      {message && (
        <p style={{ textAlign: "right", marginTop: "8px" }}>{message}</p>
      )}
    </div>
  );
}