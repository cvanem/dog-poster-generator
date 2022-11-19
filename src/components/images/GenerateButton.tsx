import Button from '@mui/material/Button';
import { useUpdateState } from '../../store/global';

export default function GenerateButton() {
  const updateState = useUpdateState();
  const handleOpen = () => updateState({ open: true });
  return (
    <Button variant='contained' size='large' color='success' onClick={handleOpen}>
      Generate
    </Button>
  );
}
