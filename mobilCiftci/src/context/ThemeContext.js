import React, { createContext, useContext, useState } from 'react';

export const lightColors = {
  background: '#f8fafc',
  card: '#ffffff',
  textMain: '#1e293b',
  textMuted: '#64748b',
  border: '#e2e8f0',
  primary: '#10b981',
  inputBg: '#f1f5f9',
  lockedBg: '#e2e8f0',
  danger: '#ef4444',
  warnBg: '#fef2f2',
  warnBorder: '#fca5a5',
  modalOverlay: 'rgba(0,0,0,0.5)',
  tabBar: '#ffffff',
  tabBorder: '#e2e8f0',
};

export const darkColors = {
  background: '#0f172a',
  card: '#1e293b',
  textMain: '#f8fafc',
  textMuted: '#94a3b8',
  border: '#334155',
  primary: '#34d399',
  inputBg: '#0f172a',
  lockedBg: '#0f172a',
  danger: '#f87171',
  warnBg: '#450a0a',
  warnBorder: '#7f1d1d',
  modalOverlay: 'rgba(0,0,0,0.7)',
  tabBar: '#1e293b',
  tabBorder: '#334155',
};

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  c: lightColors,
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(prev => !prev);
  const c = isDark ? darkColors : lightColors;
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, c }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
