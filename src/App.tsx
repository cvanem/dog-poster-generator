import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { Suspense } from 'react';
import LoadingScreen from './components/layout/LoadingScreen';
import theme from './theme';
const Layout = React.lazy(() => import('./components/layout/Layout')); // Lazy-loaded, for use with React.Suspense

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LoadingScreen />}>
        <Layout />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
