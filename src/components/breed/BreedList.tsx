import { Divider, Grid } from '@mui/material';
import useBreeds from '../../hooks/useBreeds';
import { useAppSelector } from '../../store/store';
import BreedListRow from './BreedListRow';

export default function BreedList() {
  useBreeds(); // Auto-load breed list
  const selected = useAppSelector(state => state.global.selected);
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item xs sx={{ fontWeight: 700 }}>
        Breed
      </Grid>
      <Grid item xs sx={{ fontWeight: 700 }}>
        Subbreed
      </Grid>
      <Grid item sx={{ fontWeight: 700, width: 132 }}>
        # of Images
      </Grid>
      <Grid item sx={{ width: 52 }}></Grid>
      <Grid item sx={{ width: 40 }}></Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {Object.keys(selected).map((k, i) => (
          <div key={k}>
            <BreedListRow id={k} {...selected[k]} canDelete={Object.keys(selected).length > 1} isLast={i === Object.keys(selected).length - 1} />
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
