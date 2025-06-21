import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import useContactsQuery from "../../hooks/useContactsQuery";
import {
  useSetSelectedContactId,
  useShowFavouritesOnly,
  useSearch,
} from "../../hooks/useZustandSelectors";
import { useEffect, useCallback } from "react";
import { useUpdateContact } from "../../hooks/useContactMutations";
import SearchBar from "../SearchBar/SearchBar";
import FavouritesToggle from "../FavouritesToggle/FavouritesToggle";
import ContactCard from "../ContactCard/ContactCard";

const ContactList = ({ navigate, page, rowsPerPage, setTotalCount }) => {
  const setSelectedContactId = useSetSelectedContactId();
  const showFavouritesOnly = useShowFavouritesOnly();
  const search = useSearch();
  const updateContactMutation = useUpdateContact();

  const { data, isLoading, isError, error } = useContactsQuery();
  const contacts = data?.data || [];

  // Client-side filtering for both search and favourites
  const filteredContacts = contacts.filter((contact) => {
    const nameMatch = contact.name.toLowerCase().includes(search.toLowerCase());
    const favouriteMatch = !showFavouritesOnly || contact.favourite;
    return nameMatch && favouriteMatch;
  });

  const total = filteredContacts.length;

  // Client-side pagination
  const displayedContacts = filteredContacts.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  useEffect(() => {
    setTotalCount(total);
  }, [total, setTotalCount]);

  const handleContactClick = useCallback(
    (id) => {
      setSelectedContactId(id);
      navigate(`/contact/${id}`);
    },
    [navigate, setSelectedContactId]
  );

  const handleFavouriteToggle = useCallback(
    (e, contact) => {
      e.stopPropagation();
      updateContactMutation.mutate({
        id: contact.id,
        ...contact,
        favourite: !contact.favourite,
      });
    },
    [updateContactMutation]
  );

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "softCardBg.main",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "softCardBg.main",
          justifyContent: "space-between",
          mb: 2,
          px: 2,
          pt: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, letterSpacing: 0.5, color: "text.primary" }}
        >
          Contacts
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, px: 2 }}>
        <SearchBar />
        <FavouritesToggle />
      </Box>
      <List
        sx={{
          width: "100%",
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0.9,
          px: 2,
          pb: 2,
        }}
      >
        {isLoading ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography align="center" color="text.primary">
                  Loading...
                </Typography>
              }
            />
          </ListItem>
        ) : isError ? (
          <ListItem>
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              Error fetching contacts: {error.message}
            </Alert>
          </ListItem>
        ) : displayedContacts.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography align="center" color="text.primary">
                  No contacts found.
                </Typography>
              }
            />
          </ListItem>
        ) : (
          displayedContacts.map((contact) => (
            <ListItem disablePadding key={contact.id} sx={{ width: "100%" }}>
              <ContactCard
                contact={contact}
                onCardClick={() => handleContactClick(contact.id)}
                onFavouriteToggle={(e) => handleFavouriteToggle(e, contact)}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ContactList;
