import { useState } from 'react';
import createUseContext from 'constate';

function useTheme() {
  const [theme, setTheme] = useState('dark');
  
  return { theme, setTheme };
}

export const useThemeContext = createUseContext(useTheme);