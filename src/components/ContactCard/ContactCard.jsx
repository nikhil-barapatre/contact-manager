import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ContactCard = ({ contact, navigate }) => {
  const handleClick = () => {
    if (navigate) {
      navigate(`/contact/${contact.id}`);
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 3, boxShadow: 1, cursor: 'pointer' }} onClick={handleClick}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 1.5 }}>
        <Box sx={{ flex: 1 }}>
          <Typography fontWeight={600}>{contact.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {contact.email}
          </Typography>
        </Box>
        <IconButton>
          {contact.favourite ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon color="disabled" />
          )}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
