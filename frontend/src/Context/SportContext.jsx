// src/context/SportContext.js
import { createContext, useContext, useState } from "react";

export const SportContext = createContext();

export const SportProvider = ({ children }) => {
  const [selectedSport, setSelectedSport] = useState(null);

  return (
    <SportContext.Provider value={{ selectedSport, setSelectedSport }}>
      {children}
    </SportContext.Provider>
  );
};

// Custom hook for cleaner usage
export const useSport = () => useContext(SportContext);
