import { useNavigate } from 'react-router-dom';
import { Paper, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContactForm from '../components/ContactForm/ContactForm';
import { useAddContact } from '../hooks/useContactMutations';
import { useState } from 'react';

const AddContactPage = () => {
  const navigate = useNavigate();
  const addContact = useAddContact();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', favourite: false });

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (data) => {
    await addContact.mutateAsync(data);
    navigate('/');
  };

  return (
    <Paper sx={{ width: { xs: '100%', md: '40vw' }, minWidth: 320, mx: 'auto', borderRadius: 4, boxShadow: 2, display: 'flex', flexDirection: 'column', bgcolor: '#fff', minHeight: 500 }}>
      <Box sx={{ flex: 1, overflowY: 'auto', pb: 0 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
          <IconButton onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        {/* Contact Form Fields (includes avatar and name) */}
        <Box sx={{ mx: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <ContactForm
            defaultValues={form}
            onSubmit={handleSubmit}
            isEdit={false}
            onFieldChange={handleFormChange}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default AddContactPage; 