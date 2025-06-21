import { Snackbar, Alert } from '@mui/material';
import useUIStore from '../../store/uiStore';

const SuccessSnackbar = () => {
  const success = useUIStore((state) => state.success);
  const setSuccess = useUIStore((state) => state.setSuccess);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSuccess(null);
  };

  return (
    <Snackbar
      open={!!success}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 99999 }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {success}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar; 