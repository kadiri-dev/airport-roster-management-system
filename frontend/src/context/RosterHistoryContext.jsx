import { createContext, useEffect, useState } from "react";

export const rosterHistoryContext = createContext();

const STORAGE_KEY = "airport-roster-saved-history";

export function RosterHistoryProvider({ children }) {
  const [savedRosters, setSavedRosters] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRosters));
    } catch {
      // History remains available in memory if browser storage is unavailable.
    }
  }, [savedRosters]);

  return (
    <rosterHistoryContext.Provider value={[savedRosters, setSavedRosters]}>
      {children}
    </rosterHistoryContext.Provider>
  );
}
