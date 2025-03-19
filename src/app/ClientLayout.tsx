'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '@/styles/theme';
import Header from '@/components/common/Header';
import { Box } from '@mui/material';
import { useInitializeTheme, useThemeStore } from '@/store/themeStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useInitializeTheme();
  const { mode } = useThemeStore();

  if (mode === null) return null;

  const hideHeaderPages = ['/map'];

  const isHideHeader = hideHeaderPages.includes(pathname);

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {!isHideHeader && <Header />}
      <Box sx={{ px: !isHideHeader ? 2 : 0 }}>{children}</Box>
    </ThemeProvider>
  );
}
