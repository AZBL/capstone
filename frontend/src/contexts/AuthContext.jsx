import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (token, userData) => {
    const decoded = jwtDecode(token);
    const tokenExpiry = decoded.exp * 1000; // convert to milliseconds

    setToken(token);
    setCurrentUser(userData);

    console.log("Token expires at:" + tokenExpiry);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiry", tokenExpiry);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleAutoLogout = () => {
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      if (tokenExpiry) {
        const currentTime = Date.now();
        const remainingTime = tokenExpiry - currentTime;

        if (remainingTime <= 0) {
          logout();
        } else {
          const timerId = setTimeout(logout, remainingTime);
          return () => clearTimeout(timerId);
        }
      }
    };

    handleAutoLogout();
    const intervalId = setInterval(handleAutoLogout, 60000);

    return () => clearInterval(intervalId);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
