import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Backdrop, CircularProgress } from '@mui/material';

const GlobalSpinner = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isVisible = isFetching > 0 || isMutating > 0;

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isVisible}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalSpinner; 