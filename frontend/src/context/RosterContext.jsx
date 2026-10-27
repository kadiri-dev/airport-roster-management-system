import { createContext, useState } from 'react';

export const rosterContext = createContext();


export function RosterProvider({children}){
    const [rosterArr,setRosterArr] = useState([]);
  return (
           <rosterContext.Provider value={[ rosterArr, setRosterArr ]}>
              {children}
          </rosterContext.Provider>
      );   
}