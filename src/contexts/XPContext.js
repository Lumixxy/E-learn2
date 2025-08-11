import React, { createContext, useContext, useState, useEffect } from 'react';

const XPContext = createContext();

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
};

export const XPProvider = ({ children }) => {
  const [totalXP, setTotalXP] = useState(0);
  const [xpHistory, setXpHistory] = useState([]);

  // Load XP data from localStorage on mount
  useEffect(() => {
    const savedXP = localStorage.getItem('userTotalXP');
    const savedHistory = localStorage.getItem('userXPHistory');
    
    if (savedXP) {
      setTotalXP(parseInt(savedXP));
    }
    
    if (savedHistory) {
      setXpHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save XP data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userTotalXP', totalXP.toString());
    localStorage.setItem('userXPHistory', JSON.stringify(xpHistory));
  }, [totalXP, xpHistory]);

  const addXP = (amount, source, questNumber = null) => {
    const newXP = totalXP + amount;
    setTotalXP(newXP);
    
    const xpEntry = {
      amount,
      source,
      questNumber,
      timestamp: new Date().toISOString(),
      totalAfter: newXP
    };
    
    setXpHistory(prev => [xpEntry, ...prev]);
    
    return newXP;
  };

  const getXPHistory = () => {
    return xpHistory;
  };

  const resetXP = () => {
    setTotalXP(0);
    setXpHistory([]);
  };

  const value = {
    totalXP,
    addXP,
    getXPHistory,
    resetXP
  };

  return (
    <XPContext.Provider value={value}>
      {children}
    </XPContext.Provider>
  );
};
