import { InputAdornment } from '@mui/material';
import { useSelectBreed } from '../../store/global';
import WholeNumber from './WholeNumber';

export default function ImageCountWholeNumber({ id, value }) {
  const selectBreed = useSelectBreed();
  return (
    <WholeNumber
      min={1}
      max={100}
      value={value}
      onChange={count => selectBreed({ id, count })}
      InputProps={{
        endAdornment: <InputAdornment position='end'>{value === 1 || value === '1' ? 'image' : 'images'}</InputAdornment>
      }}
    />
  );
}
