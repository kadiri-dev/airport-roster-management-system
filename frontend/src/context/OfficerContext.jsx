import { createContext, useState } from 'react';
import { initialOfficers } from '../Data';

export const officerContext = createContext();

export function OfficerProvider({children}){
    const [officers,setOfficers] = useState(initialOfficers);
    return (
         <officerContext.Provider value={[ officers, setOfficers ]}>
            {children}
        </officerContext.Provider>
    );
}