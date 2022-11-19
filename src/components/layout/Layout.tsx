import { Box, Container, Divider } from '@mui/material';
import BreedList from '../breed/BreedList';
import GenerateButton from '../images/GenerateButton';
import ImagesModal from '../images/ImagesModal';
import Header from './Header';
import { wrapPromise } from '../../helpers';

// Async timer for use with React.Suspense, suspender and resource
const countDownTimer = async timer => await new Promise(resolve => setTimeout(() => resolve(timer), 1000 * timer));
const timerResource = wrapPromise(countDownTimer(3));

function Layout() {
  timerResource.read(); // Ensure the loading screen is shown for at least 3 seconds
  return (
    <Container sx={{ mt: 2 }} data-testid="layout-container" >
      <Header />
      <Divider sx={{ mb: 2 }} />
      <BreedList />
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <GenerateButton />
        <ImagesModal />
      </Box>
    </Container>
  );
}

export default Layout;
