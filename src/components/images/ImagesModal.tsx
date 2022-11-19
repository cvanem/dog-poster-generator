import { connect } from 'react-redux';
import { Button, Divider, Modal, Box } from '@mui/material';
import useImages from '../../hooks/useImages';
import GridTable from '../grid/GridTable';
import { RootState, useAppSelector } from '../../store/store';
import { useUpdateState } from '../../store/global';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  '@media (max-width: 1500px)': {
    width: 800
  },
  '@media (max-width: 1200px)': {
    width: '50%'
  },

  '@media (max-width: 1050px)': {
    width: '75%'
  }
};

function ImagesModal({ loading }) {
  const open = useAppSelector(state => state.global.open);
  const updateState = useUpdateState();
  const handleClose = () => updateState({ open: false });
  const { images = [] } = useImages({ trigger: open }); // Auto-request images when modal is open
  return (
    <Modal sx={{ m: 0, p: 0 }} open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
      <Box sx={{ fontWeight: 700, fontSize: 20 }}>
        <Box sx={style}>
          {loading ? 'Loading...' : `Viewing ${images.length} image${images.length === 1 ? '' : 's'}`}
          <Divider sx={{ my: 1 }} />
          {loading === false && images.length === 0 ? (
            <>
              <Box sx={{ textAlign: 'center', color: 'red', fontWeight: 500, mt: 3 }}>No images to display!</Box>
              <Box sx={{ textAlign: 'center', fontWeight: 500, fontSize: 16, my: 3 }}>
                Please ensure you have selected at least one breed before pressing the generate button.
              </Box>
              <Box sx={{ textAlign: 'center', my: 3 }}>
                <Button color='warning' variant='contained' onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </>
          ) : (
            <GridTable data={[...images].sort(() => Math.random() - 0.5).map(image => ({ image, title: 'a', description: 'b' }))} height='75vh' />
          )}
        </Box>
      </Box>
    </Modal>
  );
}

// As per the requirement for using a Higher Order Component, this export uses the connect HOC to inject the loading prop into the ImagesModal component
export default connect((state: RootState) => ({ loading: state.global.loading }))(ImagesModal);
