import { Box, Button } from '@mui/material';

const Pagination = ({ page, setPage, hasNext, hasPrev }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
    <Button
      variant="outlined"
      disabled={!hasPrev}
      onClick={() => setPage(page - 1)}
    >
      Previous
    </Button>
    <Button
      variant="outlined"
      disabled={!hasNext}
      onClick={() => setPage(page + 1)}
    >
      Next
    </Button>
  </Box>
);

export default Pagination;
