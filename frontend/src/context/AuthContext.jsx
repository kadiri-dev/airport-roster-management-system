import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

// DEMO ONLY: these credentials are bundled in client-side code.
// Do not use this as security for real or confidential information.
const DEMO_USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "viewer", password: "viewer123", role: "viewer" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("roster-demo-user")) ?? null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    const match = DEMO_USERS.find(
      (item) =>
        item.username === username.trim().toLowerCase() &&
        item.password === password
    );
    if (!match) return false;

    const safeUser = { username: match.username, role: match.role };
    try {
      sessionStorage.setItem("roster-demo-user", JSON.stringify(safeUser));
    } catch {
      // In-memory login still works if browser storage is unavailable.
    }
    setUser(safeUser);
    return true;
  };

  const logout = () => {
    try {
      sessionStorage.removeItem("roster-demo-user");
    } catch {
      // Ignore unavailable browser storage.
    }
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
