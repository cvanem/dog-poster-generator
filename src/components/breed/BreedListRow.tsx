import React from 'react';
import { Fab, Grid, Tooltip } from '@mui/material';
import BreedSelector from './BreedSelector';
import SubBreedSelector from './SubBreedSelector';
import * as Icons from '@mui/icons-material';
import { useRemoveBreed, useSelectBreed } from '../../store/global';
import ImageCountWholeNumber from '../input/ImageCountWholeNumber';

export default function BreedListRow({ id, breed, subBreed, count, canDelete = true, isLast }) {
  const selectBreed = useSelectBreed();
  const removeBreed = useRemoveBreed();
  const handleAdd = React.useCallback(() => selectBreed({}), [selectBreed]);
  const handleRemove = React.useCallback(() => removeBreed({ id }), [id, removeBreed]);
  return (
    <Grid container spacing={2} sx={{ mt: 1 }} alignItems='center'>
      <Grid item xs>
        <BreedSelector id={id} value={breed} />
      </Grid>
      <Grid item xs>
        <SubBreedSelector id={id} value={subBreed} />
      </Grid>
      <Grid item sx={{ width: 132 }}>
        <ImageCountWholeNumber id={id} value={count} />
      </Grid>
      <Grid item sx={{ width: 52 }}>
        {canDelete && (
          <Tooltip title='Remove row'>
            <Fab size='small' color='warning' aria-label='remove' onClick={handleRemove}>
              <Icons.Delete />
            </Fab>
          </Tooltip>
        )}
      </Grid>
      <Grid item sx={{ width: 40 }}>
        {isLast && (
          <Tooltip title='Add new row'>
            <Fab size='small' color='primary' aria-label='add' onClick={handleAdd}>
              <Icons.Add />
            </Fab>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}
