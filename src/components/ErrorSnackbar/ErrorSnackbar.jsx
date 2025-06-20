import { Snackbar, Alert } from '@mui/material';
import useUIStore from '../../store/uiStore';

const ErrorSnackbar = () => {
  const { error, setError } = useUIStore();
  return (
    <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
      <Alert severity="error" onClose={() => setError(null)}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
