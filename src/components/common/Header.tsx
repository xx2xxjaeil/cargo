// material-ui
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';

// components
import ThemeToggle from '@/components/ThemeToggle';

/**
 * Header component
 * @constructor
 */
export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            🚗
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cargo
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
