import { createContext, useState } from "react";

export const rosterHistoryContext = createContext();

export function RosterHistoryProvider({ children }) {
  const [savedRosters, setSavedRosters] = useState([]);

  return (
    <rosterHistoryContext.Provider
      value={[savedRosters, setSavedRosters]}
    >
      {children}
    </rosterHistoryContext.Provider>
  );
}