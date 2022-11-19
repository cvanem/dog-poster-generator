import { Grid } from '@mui/material';
import pkg from '../../../package.json';

function Header() {
  return (
    <Grid container alignItems='center' sx={{ fontSize: 28, fontWeight: 700, py: 2 }} spacing={2}>
      <Grid item>
        <img alt='logo' src='/logo32.png' />
      </Grid>
      <Grid item sx={{}} xs>{`${pkg.name} v${pkg.version}`}</Grid>
      <Grid item xs={12} sx={{ fontSize: 16, fontWeight: 500 }}>
        Instructions: Select desired, breed, subbreed and number of images and click generate.
      </Grid>
    </Grid>
  );
}

export default Header;
