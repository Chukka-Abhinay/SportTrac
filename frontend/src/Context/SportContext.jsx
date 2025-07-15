// // src/context/SportContext.js
// import { createContext, useContext, useState } from "react";

// export const SportContext = createContext();

// export const SportProvider = ({ children }) => {
//   const [selectedSport, setSelectedSport] = useState(null);

//   return (
//     <SportContext.Provider value={{ selectedSport, setSelectedSport }}>
//       {children}
//     </SportContext.Provider>
//   );
// };

// // Custom hook for cleaner usage
// export const useSport = () => useContext(SportContext);

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create context
const SportContext = createContext();

// 2. Provider component
export const SportProvider = ({ children }) => {
  // Load from localStorage (only once on first render)
  const [selectedSport, setSelectedSport] = useState(() => {
    try {
      const stored = localStorage.getItem("selectedSport");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Error loading selectedSport from localStorage", err);
      return null;
    }
  });

  // Update localStorage whenever selectedSport changes
  useEffect(() => {
    if (selectedSport) {
      localStorage.setItem("selectedSport", JSON.stringify(selectedSport));
    }
  }, [selectedSport]);

  return (
    <SportContext.Provider value={{ selectedSport, setSelectedSport }}>
      {children}
    </SportContext.Provider>
  );
};

// 3. Hook to use in components
export const useSport = () => useContext(SportContext);
