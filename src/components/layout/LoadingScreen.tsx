import { Box, CircularProgress, Grid } from '@mui/material';
import { publicUrl } from '../../helpers';

function LoadingScreen() {
  return (
    <Grid container justifyContent='center' alignItems='center' spacing={2} sx={{ textAlign: 'center', marginTop: '20vh' }}>
      <Grid item xs={12}>
        <img alt='logo' src={publicUrl('/logo192.png')} />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ textAlign: 'center', fontSize: 28, fontWeight: 700, color: 'palette.primary.main' }}>Loading application...</Box>
      </Grid>
      <Grid item xs={12}>
        <CircularProgress color='primary' size={92} />
      </Grid>
    </Grid>
  );
}

export default LoadingScreen;
