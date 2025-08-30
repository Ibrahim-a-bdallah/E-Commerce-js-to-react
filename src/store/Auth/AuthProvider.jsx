// AuthContext.js
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("data");
    if (stored) setData(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
