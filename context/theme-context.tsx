import { useState, createContext, useContext } from 'react';

export const ThemeContext = createContext<any>({});

export const ThemeProvider = ({ children }: any) => {
  // @todo use local storage
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const themeContext = {
    darkMode,
    toggleTheme
  };

  return <ThemeContext.Provider value={themeContext}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
