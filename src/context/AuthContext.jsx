import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const login = useCallback((email) => {
    setIsLoggedIn(true);
    setLoggedInUser(email);
    setMessage("Login successful");
    setMessageType("success");
  }, []);

  const signup = useCallback((email) => {
    setIsLoggedIn(true);
    setLoggedInUser(email);
    setMessage("Signup successful");
    setMessageType("success");
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setLoggedInUser("");
    setMessage("Logout successful");
    setMessageType("success");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUser,
        message,
        messageType,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}