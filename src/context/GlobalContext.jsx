import React, { createContext, useState } from 'react';

// Create GlobalContext
export const GlobalContext = createContext();

// GlobalProvider component to wrap app and provide global state
export const GlobalProvider = ({ children }) => {
  // Example global state: theme (light/dark)
  const [theme, setTheme] = useState('light');

  // Example global state: app settings
  const [settings, setSettings] = useState({
    // Add any global settings here
  });

  return (
    <GlobalContext.Provider value={{ theme, setTheme, settings, setSettings }}>
      {children}
    </GlobalContext.Provider>
  );
};
