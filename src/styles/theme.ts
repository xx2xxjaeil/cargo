import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF8717' },
    background: { default: '#FFFFFF' },
    text: { primary: '#333333' }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF8717' },
    background: { default: '#121212' },
    text: { primary: '#FFFFFF' }
  }
});
