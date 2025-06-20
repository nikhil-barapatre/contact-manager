import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Avatar, IconButton, Switch, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import useUIStore from '../../store/uiStore';
import useContactStore from '../../store/contactStore';
import { useAddContact } from '../../hooks/useContactMutations';
import { useForm } from 'react-hook-form';

const ContactModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const setModalOpen = useUIStore((state) => state.setModalOpen);
  const selectedContact = useContactStore((state) => state.selectedContact);
  const setSelectedContact = useContactStore((state) => state.setSelectedContact);
  const addContact = useAddContact();
  const isAddMode = !selectedContact;

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: { name: '', email: '', phone: '', address: '', favourite: false },
  });

  const handleClose = () => {
    setModalOpen(false);
    setSelectedContact(null);
    reset();
  };

  const onSubmit = async (data) => {
    await addContact.mutateAsync(data);
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, bgcolor: '#f7f7fa' } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: 22, bgcolor: '#f7f7fa', pb: 0 }}>
        New Contact
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f7f7fa' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1, mb: 2 }}>
          <Avatar sx={{ width: 96, height: 96, bgcolor: '#bdbdbd', mb: 1 }} />
          <IconButton color="primary" sx={{ bgcolor: '#fff', border: '1px solid #e0e0e0', mb: 1 }}>
            <AddAPhotoIcon />
          </IconButton>
          <Typography fontWeight={500} color="text.secondary">Add Photo</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register('name', { required: 'Name is required' })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}  
          />
          <TextField  
            label="Phone"
            fullWidth
            margin="normal"
            {...register('phone')}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            {...register('address')}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
            <Typography sx={{ mr: 1 }}>Favourite</Typography>
            <Switch {...register('favourite')} color="warning" />
          </Box>
          <DialogActions sx={{ justifyContent: 'space-between', px: 0, mt: 2 }}>
            <Button onClick={handleClose} color="inherit">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Done</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
