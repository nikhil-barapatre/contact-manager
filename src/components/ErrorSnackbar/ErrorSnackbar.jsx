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
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
