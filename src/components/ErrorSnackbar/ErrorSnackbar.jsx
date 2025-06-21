import { Snackbar, Alert } from "@mui/material";
import useUIStore from "../../store/uiStore";

const ErrorSnackbar = () => {
  const error = useUIStore((state) => state.error);
  const setError = useUIStore((state) => state.setError);

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };

  return (
    <Snackbar
      open={!!error}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 99999 }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
