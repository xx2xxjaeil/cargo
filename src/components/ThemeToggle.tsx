'use client';

import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useThemeStore } from '@/store/themeStore';

/**
 * Theme toggle component
 * @constructor
 */
export default function ThemeToggle() {
  const { mode, toggleMode } = useThemeStore();

  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'dark' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
