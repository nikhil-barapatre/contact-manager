import { Box, Paper, Button } from '@mui/material';
import ContactList from '../components/ContactList/ContactList';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ContactDetailsPage from './ContactDetailsPage';
import { useState, useCallback } from 'react';
import AddContactPage from './AddContactPage';
import Pagination from '../components/Pagination/Pagination';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'softCardBg.main', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <Routes>
        <Route
          path="/"
          element={
            <Paper sx={{ width: { xs: '100%', md: '40vw' }, minWidth: 320, mx: 'auto', borderRadius: 4, boxShadow: 2, display: 'flex', flexDirection: 'column', bgcolor: 'softCardBg.main', height: '100vh', maxHeight: '100vh' }}>
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <ContactList
                  navigate={navigate}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setTotalCount={setTotalCount}
                />
              </Box>
              <Box sx={{
                bgcolor: 'softCardBg.main',
                borderRadius: '0 0 16px 16px',
                boxShadow: '0 -2px 5px rgba(0,0,0,0.05)'
              }}>
                <Box sx={{ px: 2, pt: 0.5, pb: 0.5 }}>
                  <Button variant="contained" color="primary" sx={{ mt: 1, bgcolor:"#6CA66B"}} fullWidth onClick={() => navigate('/add')}>
                    Add Contact
                  </Button>
                </Box>
                <Pagination
                  page={page}
                  rowsPerPage={rowsPerPage}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Box>
            </Paper>
          }
        />
        <Route path="/add" element={<AddContactPage />} />
        <Route path="/contact/:id" element={<ContactDetailsPage />} />
      </Routes>
    </Box>
  );
};

export default ContactsPage;
