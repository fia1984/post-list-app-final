import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const login = (email) => {
    const userName = email.split("@")[0];

    setLoggedInUser({
      name: userName,
      email: email,
    });

    setIsLoggedIn(true);
    setMessage(`${userName} logged in successfully`);
    setMessageType("success");
  };

  const signup = (name, email) => {
    setLoggedInUser({
      name: name,
      email: email,
    });

    setIsLoggedIn(true);
    setMessage(`Welcome ${name}! Your account has been created successfully.`);
    setMessageType("success");

    alert(`Welcome ${name}! Your account has been created successfully.`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setMessage("User logged out successfully");
    setMessageType("success");
  };

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