import { Box, Paper, Select, MenuItem, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactList from '../components/ContactList/ContactList';
import ContactModal from '../components/ContactModal/ContactModal';
import useUIStore from '../store/uiStore';
import useContactStore from '../store/contactStore';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ContactDetailsPage from './ContactDetailsPage';
import { useState } from 'react';

const ContactsPage = () => {
  const setModalOpen = useUIStore((state) => state.setModalOpen);
  const setSelectedContact = useContactStore((state) => state.setSelectedContact);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleAddContact = () => {
    setSelectedContact(null);
    setModalOpen(true);
  };

  // For pagination bar
  const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, totalCount);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'softCardBg.main', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <Routes>
        <Route
          path="/"
          element={
            <Paper sx={{ width: { xs: '100%', md: '40vw' }, minWidth: 320, mx: 'auto', borderRadius: 4, boxShadow: 2, display: 'flex', flexDirection: 'column', bgcolor: 'softCardBg.main', height: '100%' }}>
              <Box sx={{ flex: 1, overflowY: 'auto', pb: 0 }}>
                <ContactList
                  navigate={navigate}
                  onAddContact={handleAddContact}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setTotalCount={setTotalCount}
                />
              </Box>
              {/* Pagination Bar (sticky at bottom of card) */}
              <Box sx={{ width: '100%', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', bgcolor: 'softCardBg.main', borderRadius: '0 0 16px 16px', boxShadow: 0, px: 2, py: 1, gap: 1, justifyContent: 'flex-end', position: 'sticky', bottom: 0, zIndex: 2 }}>
                <Typography sx={{ fontSize: 15, mr: 1, color: 'text.primary' }}>Rows per page:</Typography>
                <Select
                  value={rowsPerPage}
                  onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(0); }}
                  size="small"
                  sx={{ fontSize: 15, width: 60 }}
                >
                  {[5, 10, 15].map((rows) => (
                    <MenuItem key={rows} value={rows}>{rows}</MenuItem>
                  ))}
                </Select>
                <Typography sx={{ fontSize: 15, mx: 2, color: 'text.primary' }}>{from}–{to} of {totalCount}</Typography>
                <IconButton onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton onClick={() => setPage(page + 1)} disabled={to >= totalCount}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Paper>
          }
        />
        <Route path="/contact/:id" element={<ContactDetailsPage />} />
      </Routes>
      <ContactModal />
    </Box>
  );
};

export default ContactsPage;
