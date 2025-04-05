// context/UserContext.js

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateField = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateField }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un <UserProvider>");
  }
  return context;
}
