import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const login = () => {
    setIsLoggedIn(true);
    setMessage("Fia logged in");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setMessage("Fia logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, message, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}