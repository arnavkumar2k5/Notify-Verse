'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      setTheme('dark');
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      try {
        const root = document.documentElement;
        console.log('Applying theme:', theme);
        
        root.classList.remove('dark', 'light');
        
        if (theme === 'dark') {
          root.classList.add('dark');
          root.setAttribute('data-theme', 'dark');
          document.body.style.backgroundColor = '#111827';
          document.body.style.color = '#f9fafb';
        } else {
          root.classList.add('light');
          root.setAttribute('data-theme', 'light');
          document.body.style.backgroundColor = '#ffffff';
          document.body.style.color = '#111827';
        }
        
        localStorage.setItem('theme', theme);
        console.log('Theme saved to localStorage:', theme);
        console.log('HTML classes after update:', root.className);
      } catch (error) {
        console.error('Error applying theme:', error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    console.log('Theme toggle attempted but disabled');
    setTheme('dark');
  };

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
