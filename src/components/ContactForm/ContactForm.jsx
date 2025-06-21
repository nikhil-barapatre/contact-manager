import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Checkbox, FormControlLabel, Button, Avatar } from '@mui/material';

const ContactForm = ({ defaultValues = {}, onSubmit, isEdit = false }) => {
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues, mode: 'onChange' });
  const nameValue = watch('name') || '';

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', bgcolor: 'softCardBg.main' }}>
      <Avatar sx={{ width: 96, height: 96, bgcolor: '#FA6F42', fontSize: 40, mb: 2 }}>
        {nameValue.trim() ? nameValue.trim()[0].toUpperCase() : ''}
      </Avatar>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
        {...register('name', { required: 'Name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
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
        sx={{ mb: 2 }}
        {...register('address', { required: 'Address is required' })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 2, bgcolor: 'softCardBg.main'}}>
        <FormControlLabel
          control={
            <Controller
              name="favourite"
              control={control}
              render={({ field }) => <Checkbox {...field} checked={!!field.value} color="primary" />}
            />
          }
          label="Favourite"
          sx={{ flex: 1, m: 0 }}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, bgcolor:"#6CA66B"}}>
        {isEdit ? 'Save Changes' : 'Add Contact'}
      </Button>
    </Box>
  );
};

export default ContactForm;
