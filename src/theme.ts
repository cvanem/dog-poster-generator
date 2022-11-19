import { createTheme } from '@mui/material/styles';

// Custom theme
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f80b5'
    },
    secondary: {
      main: '#f50057'
    }
  }
} as any);

export default theme;
