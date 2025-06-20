import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchContacts, updateContact, deleteContact } from '../api/contactsApi';
import { Box, Typography, Avatar, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Switch, TextField, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

const ContactDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      const all = await fetchContacts({ page: 1, limit: 1000 });
      return all.data.find((c) => String(c.id) === String(id));
    },
  });
  const [editMode, setEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [form, setForm] = useState(null);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!data) return <Typography>Contact not found.</Typography>;

  // Prefill form on first edit
  if (editMode && !form) {
    setForm({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      favourite: data.favourite,
    });
  }

  const handleEdit = () => setEditMode(true);
  const handleCancelEdit = () => { setEditMode(false); setForm(null); };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSwitch = (e) => setForm({ ...form, favourite: e.target.checked });

  const handleSave = async () => {
    await updateContact({ id: data.id, ...form });
    setEditMode(false);
    setForm(null);
    refetch();
  };

  const handleDelete = async () => {
    await deleteContact(data.id);
    setDeleteDialog(false);
    navigate('/');
  };

  return (
    <Paper sx={{ width: { xs: '100%', md: '40vw' }, minWidth: 320, mx: 'auto', borderRadius: 4, boxShadow: 2, display: 'flex', flexDirection: 'column', bgcolor: '#fff', minHeight: 500 }}>
      <Box sx={{ flex: 1, overflowY: 'auto', pb: 0 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
          <IconButton onClick={() => {
            if (editMode) {
              setEditMode(false);
              setForm(null);
            } else {
              navigate(-1);
            }
          }}>
            <ArrowBackIcon />
          </IconButton>
          {editMode ? (
            <Button onClick={handleSave} color="primary" variant="contained">Done</Button>
          ) : (
            <IconButton onClick={handleEdit} color="primary">
              <EditIcon />
            </IconButton>
          )}
        </Box>
        {/* Avatar and Name */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 96, height: 96, bgcolor: '#bdbdbd', fontSize: 40, mb: 1 }}>
            {data.name[0]}
          </Avatar>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>{editMode ? (
            <TextField name="name" value={form?.name || ''} onChange={handleChange} variant="standard" fullWidth sx={{ input: { fontSize: 28, fontWeight: 700, textAlign: 'center' } }} />
          ) : data.name}</Typography>
          {data.favourite && !editMode && <StarIcon color="warning" fontSize="large" />}
        </Box>
        {/* Details Fields - improved style */}
        <Box sx={{ mx: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ bgcolor: '#faf9f7', borderRadius: 3, p: 2, mb: 1 }}>
            <Typography color="text.secondary" fontSize={15} sx={{ mb: 0.5 }}>Email</Typography>
            {editMode ? (
              <TextField name="email" value={form?.email || ''} onChange={handleChange} variant="standard" fullWidth />
            ) : (
              <Typography fontSize={17} fontWeight={500}>{data.email}</Typography>
            )}
          </Box>
          <Box sx={{ bgcolor: '#faf9f7', borderRadius: 3, p: 2, mb: 1 }}>
            <Typography color="text.secondary" fontSize={15} sx={{ mb: 0.5 }}>Phone</Typography>
            {editMode ? (
              <TextField name="phone" value={form?.phone || ''} onChange={handleChange} variant="standard" fullWidth />
            ) : (
              <Typography fontSize={17} fontWeight={500}>{data.phone}</Typography>
            )}
          </Box>
          <Box sx={{ bgcolor: '#faf9f7', borderRadius: 3, p: 2, mb: 1 }}>
            <Typography color="text.secondary" fontSize={15} sx={{ mb: 0.5 }}>Address</Typography>
            {editMode ? (
              <TextField name="address" value={form?.address || ''} onChange={handleChange} variant="standard" fullWidth />
            ) : (
              <Typography fontSize={17} fontWeight={500}>{data.address}</Typography>
            )}
          </Box>
        </Box>
        {/* Favourite Switch */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mx: 2 }}>
          <Typography color="text.secondary" fontSize={15} sx={{ mr: 1 }}>Favourite</Typography>
          {editMode ? (
            <Switch checked={!!form?.favourite} onChange={handleSwitch} color="warning" />
          ) : (
            <Switch checked={!!data.favourite} disabled color="warning" />
          )}
        </Box>
        {/* Delete Button */}
        {!editMode && (
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} fullWidth sx={{ mt: 2 }} onClick={() => setDeleteDialog(true)}>
            Delete Contact
          </Button>
        )}
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Contact</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this contact?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>No</Button>
            <Button onClick={handleDelete} color="error">Yes</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};

export default ContactDetailsPage; 