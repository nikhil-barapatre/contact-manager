import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  InputBase,
  Paper,
  Fab,
  FormControlLabel,
  Switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import useContactsQuery from '../../hooks/useContactsQuery';
import { useShowFavouritesOnly, useSetShowFavouritesOnly } from '../../hooks/useZustandSelectors';
import { useEffect } from 'react';
import useContactStore from '../../store/contactStore';

const ContactList = ({ navigate, onAddContact, page, rowsPerPage, setTotalCount }) => {
  const { data, isLoading } = useContactsQuery({ page, limit: rowsPerPage });
  const contacts = data?.data || [];
  const showFavouritesOnly = useShowFavouritesOnly();
  const setShowFavouritesOnly = useSetShowFavouritesOnly();
  const search = useContactStore((state) => state.search);
  const setSearch = useContactStore((state) => state.setSearch);

  useEffect(() => {
    if (setTotalCount && data?.total !== undefined) {
      setTotalCount(data.total);
    }
  }, [data, setTotalCount]);

  return (
    <Box sx={{ width: '100%', pt: 2, pb: 8, minHeight: '100vh', bgcolor: 'softCardBg.main', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center',bgcolor: 'softCardBg.main', justifyContent: 'space-between', mb: 2, px: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: 0.5, color: 'text.primary' }}>Contacts</Typography>
        <Fab color="primary" size="small" onClick={onAddContact} aria-label="add" sx={{ boxShadow: 0 }}>
          <AddIcon />
        </Fab>
      </Box>
      {/* Search Bar */}
      <Paper sx={{ display: 'flex', alignItems: 'center', borderRadius: 4, px: 2, py: 0.5, mb: 2, mx: 2, bgcolor: '#F5F8F6' }}>
        <SearchIcon color="action" />
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: 18, color: 'text.primary' }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search contacts' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Paper>
      {/* Show Favourites Only Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 2, mb: 1 }}>
        <FormControlLabel
          control={<Switch checked={showFavouritesOnly} onChange={e => setShowFavouritesOnly(e.target.checked)} color="warning" />}
          label={<Typography fontSize={15} color="text.primary">Show Favourites Only</Typography>}
        />
      </Box>
      {/* Contact List */}
      <List sx={{ 
        width: '100%', 
        flex: 1, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5, // Adds space between each contact card
        p: 0,
      }}>
        {isLoading ? (
          <ListItem>
            <ListItemText primary={<Typography align="center" color="text.primary">Loading...</Typography>} />
          </ListItem>
        ) : contacts.length === 0 ? (
          <ListItem>
            <ListItemText primary={<Typography align="center" color="text.primary">No contacts found.</Typography>} />
          </ListItem>
        ) : (
          contacts.map((contact) => (
            <ListItem disablePadding key={contact.id} sx={{ width: '100%' }}>
              <ListItemButton 
                onClick={() => navigate(`/contact/${contact.id}`)} 
                sx={{ 
                  width: '100%', 
                  bgcolor: '#FAFFF9', 
                  '&:hover': { bgcolor: '#FFECE2' }, 
                  borderRadius: 3, // Rounded corners for every card
                  p: 1.5, // Padding inside the card
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#FA6F42', color: 'white', width: 48, height: 48, fontSize: 22, mr: 1 }}>
                    {contact.name?.[0]?.toUpperCase() || '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography fontSize={17} fontWeight={600} color="text.primary">{contact.name}</Typography>}
                  secondary={<Typography fontSize={14} color="text.secondary">{contact.email}</Typography>}
                />
                <IconButton edge="end" disableRipple tabIndex={-1} sx={{ ml: 1 }}>
                  {contact.favourite ? <StarIcon color="warning" /> : <StarBorderIcon color="disabled" />}
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ContactList;
