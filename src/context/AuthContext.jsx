import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const login = (name) => {
    setLoggedInUser({
      name: name,
    });

    setIsLoggedIn(true);
    setMessage(`${name} logged in successfully`);
    setMessageType("success");
  };

  const signup = (name, email) => {
    setLoggedInUser({
      name: name,
      email: email,
    });

    setIsLoggedIn(true);
    setMessage(`${name} signed up successfully`);
    setMessageType("success");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setMessage("");
    setMessageType("");
  };

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUser,
        login,
        signup,
        logout,
        message,
        messageType,
        clearMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}