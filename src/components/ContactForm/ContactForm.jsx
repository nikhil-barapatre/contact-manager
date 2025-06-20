import { useForm } from 'react-hook-form';
import { Box, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const ContactForm = ({ defaultValues = {}, onSubmit, isEdit = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
        {...register('email', { required: 'Email is required', pattern: { value: /.+@.+\..+/, message: 'Invalid email' } })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9\-\+]{9,15}$/, message: 'Invalid phone' } })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        label="Address"
        fullWidth
        margin="normal"
        {...register('address', { required: 'Address is required' })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <FormControlLabel
        control={<Checkbox {...register('favourite')} color="primary" />}
        label="Favourite"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {isEdit ? 'Save Changes' : 'Add Contact'}
      </Button>
    </Box>
  );
};

export default ContactForm;
