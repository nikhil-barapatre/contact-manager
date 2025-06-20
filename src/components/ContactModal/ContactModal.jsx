import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Avatar, Switch, TextField } from '@mui/material';
import useUIStore from '../../store/uiStore';
import useContactStore from '../../store/contactStore';
import { useAddContact } from '../../hooks/useContactMutations';
import { useForm } from 'react-hook-form';

const ContactModal = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const setModalOpen = useUIStore((state) => state.setModalOpen);
  // const selectedContact = useContactStore((state) => state.selectedContact);
  const setSelectedContact = useContactStore((state) => state.setSelectedContact);
  const addContact = useAddContact();
  // const isAddMode = !selectedContact;

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', phone: '', address: '', favourite: false },
  });

  const nameValue = watch('name') || '';

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
    <Dialog open={isModalOpen} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, bgcolor: '#f7f7fa', width: { xs: '100%', md: '40vw' }, minWidth: 320 } }}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: 22, bgcolor: '#f7f7fa', pb: 0 }}>
        New Contact
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f7f7fa' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1, mb: 2 }}>
          <Avatar sx={{ width: 96, height: 96, bgcolor: '#bdbdbd', mb: 1, fontSize: 40 }}>
            {nameValue.trim() ? nameValue.trim()[0].toUpperCase() : ''}
          </Avatar>
          {/* <Typography fontWeight={500} color="text.secondary">Avatar</Typography> */}
        </Box>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: 'Enter correct email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField  
            label="Phone"
            fullWidth
            margin="normal"
            {...register('phone', {
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter correct phone number',
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
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
