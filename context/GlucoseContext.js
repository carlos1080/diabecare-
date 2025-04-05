import React, { createContext, useContext, useState } from "react";

// Estructura de una medición
const GlucoseContext = createContext();

export function GlucoseProvider({ children }) {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    setEntries((prev) => [...prev, entry]);
  };

  const removeEntry = (timestamp) => {
    setEntries((prev) => prev.filter((e) => e.timestamp !== timestamp));
  };

  return (
    <GlucoseContext.Provider value={{ entries, addEntry, removeEntry }}>
      {children}
    </GlucoseContext.Provider>
  );
}

// Hook para usar fácilmente el contexto
export function useGlucose() {
  const context = useContext(GlucoseContext);
  if (!context) {
    throw new Error("useGlucose debe usarse dentro de un GlucoseProvider");
  }
  return context;
}
