import * as React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const height = 180;

const StyledCard = ({ sx = undefined, ...other }) => (
  <Card
    sx={{
      flex: '1',
      textAlign: 'center',
      height,
      borderRadius: 2,
      transition: 'transform 0.15s ease-in-out',
      '&:hover': {
        transform: 'scale3d(1.025, 1.025, 1)'
      },
      cursor: 'pointer',
      ...sx
    }}
    {...other}
  />
);

export default function GridItem({ title = undefined, description = undefined, image = undefined, children = undefined }) {
  const [state, setState] = React.useState({
    raised: false
  });
  return children ? (
    <StyledCard>
      <CardContent>{children}</CardContent>
    </StyledCard>
  ) : (
    <StyledCard
      onMouseOver={() => setState({ raised: true })}
      onMouseOut={() => setState({ raised: false })}
      raised={state.raised}
      elevation={state.raised ? 8 : 4}
    >
      <CardMedia
        sx={{
          borderBottom: `1px solid ${grey[400]}`
        }}
        image={image}
        component='img'
        height={height}
        width='100%'
        alt='cover image'
      />
      <CardContent sx={{ pt: 1, pb: 0 }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h5' noWrap>
                  {title || 'Unknown Name'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color='textSecondary' noWrap>
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
}
