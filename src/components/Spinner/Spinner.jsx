import { Box, CircularProgress } from '@mui/material';

const Spinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress color="primary" size={60} />
  </Box>
);

export default Spinner;
