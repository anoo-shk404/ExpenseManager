import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [participants, setParticipants] = useState([]);

  return (
    <AppContext.Provider value={{ expenses, setExpenses, participants, setParticipants }}>
      {children}
    </AppContext.Provider>
  );
};