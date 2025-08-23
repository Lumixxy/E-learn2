import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the XP context
const XPContext = createContext();

// Create a provider component
export const XPProvider = ({ children }) => {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  
  // Load XP from localStorage on component mount
  useEffect(() => {
    const storedXP = localStorage.getItem('userXP');
    if (storedXP) {
      setXP(parseInt(storedXP));
    }
  }, []);
  
  // Update level whenever XP changes
  useEffect(() => {
    // Simple level calculation: level = 1 + Math.floor(xp / 1000)
    const newLevel = 1 + Math.floor(xp / 1000);
    setLevel(newLevel);
    
    // Save XP to localStorage
    localStorage.setItem('userXP', xp.toString());
  }, [xp]);
  
  // Function to add XP
  const addXP = (amount) => {
    setXP(prevXP => prevXP + amount);
  };
  
  // Function to get XP needed for next level
  const getXPForNextLevel = () => {
    return (level * 1000);
  };
  
  // Function to get progress percentage to next level
  const getLevelProgress = () => {
    const xpForCurrentLevel = (level - 1) * 1000;
    const xpForNextLevel = level * 1000;
    const xpInCurrentLevel = xp - xpForCurrentLevel;
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;
    
    return Math.floor((xpInCurrentLevel / xpNeededForNextLevel) * 100);
  };
  
  return (
    <XPContext.Provider value={{ xp, level, addXP, getXPForNextLevel, getLevelProgress }}>
      {children}
    </XPContext.Provider>
  );
};

// Custom hook to use the XP context
export const useXP = () => useContext(XPContext);