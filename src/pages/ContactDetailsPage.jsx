import { useParams, useNavigate } from "react-router-dom";
import { useQuery} from "@tanstack/react-query";
import {
  fetchContacts,
} from "../api/contactsApi";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useState, useCallback } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import useContactStore from "../store/contactStore";
import { useUpdateContact, useDeleteContact } from "../hooks/useContactMutations";

const ContactDetailsPage = () => {
  const { id: idFromUrl } = useParams();
  const navigate = useNavigate();
  const selectedContactId = useContactStore((state) => state.selectedContactId);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [form, setForm] = useState(null);

  const id = selectedContactId || idFromUrl;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contact", id],
    queryFn: async () => {
      const all = await fetchContacts({ page: 1, limit: 1000 });
      return all.data.find((c) => String(c.id) === String(id));
    },
  });

  const updateContactMutation = useUpdateContact();
  const deleteContactMutation = useDeleteContact();

  const handleEdit = useCallback(() => setEditMode(true), []);

  const handleEditSubmit = useCallback(
    async (formData) => {
      if (!data) return;
      await updateContactMutation.mutateAsync({ id: data.id, ...formData });
      setTimeout(() => {
        setEditMode(false);
        setForm(null);
        refetch();
      }, 500);
    },
    [data, updateContactMutation, refetch]
  );

  const handleDelete = useCallback(async () => {
    if (!data) return;
    await deleteContactMutation.mutateAsync(data.id);
    setTimeout(() => {
      setDeleteDialog(false);
      navigate("/");
    }, 500);
  }, [data, deleteContactMutation, navigate]);

  const handleOpenDeleteDialog = useCallback(() => setDeleteDialog(true), []);
  const handleCloseDeleteDialog = useCallback(() => setDeleteDialog(false), []);

  const handleBack = useCallback(() => {
    if (editMode) {
      setEditMode(false);
      setForm(null);
    } else {
      navigate(-1);
    }
  }, [editMode, navigate]);

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

  return (
    <Paper
      sx={{
        width: { xs: "100%", md: "40vw" },
        minWidth: 320,
        mx: "auto",
        borderRadius: 4,
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "softCardBg.main",
        minHeight: 500,
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", pb: 0 }}>
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            pt: 2,
            mb: 1,
            bgcolor: "softCardBg.main",
          }}
        >
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          {editMode && (
            <Typography
              variant="h5"
              component="h1"
              sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
            >
              Edit Contact
            </Typography>
          )}
          <IconButton
            onClick={!editMode ? handleEdit : undefined}
            color="primary"
            sx={{ width: 40 }}
          >
            {!editMode && <EditIcon />}
          </IconButton>
        </Box>
        {editMode ? (
          <Box
            sx={{
              mx: 2,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              bgcolor: "softCardBg.main",
            }}
          >
            <ContactForm
              defaultValues={{
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                favourite: data.favourite,
              }}
              onSubmit={handleEditSubmit}
              isEdit={true}
              formId="edit-contact-form"
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 2,
                bgcolor: "softCardBg.main",
              }}
            >
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  bgcolor: "#FA6F42",
                  fontSize: 40,
                  mb: 1,
                }}
              >
                {data.name[0]}
              </Avatar>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                {data.name}
              </Typography>
              {data.favourite && <StarIcon color="warning" fontSize="large" />}
            </Box>
            {/* Details Fields */}
            <Box
              sx={{
                mx: 2,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                bgcolor: "softCardBg.main",
              }}
            >
              <Box sx={{ bgcolor: "#FAFFF9", borderRadius: 3, p: 2, mb: 1 }}>
                <Typography
                  color="text.secondary"
                  fontSize={15}
                  sx={{ mb: 0.5 }}
                >
                  Email
                </Typography>
                <Typography fontSize={17} fontWeight={500}>
                  {data.email}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: "#FAFFF9", borderRadius: 3, p: 2, mb: 1 }}>
                <Typography
                  color="text.secondary"
                  fontSize={15}
                  sx={{ mb: 0.5 }}
                >
                  Phone
                </Typography>
                <Typography fontSize={17} fontWeight={500}>
                  {data.phone}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: "#FAFFF9", borderRadius: 3, p: 2, mb: 1 }}>
                <Typography
                  color="text.secondary"
                  fontSize={15}
                  sx={{ mb: 0.5 }}
                >
                  Address
                </Typography>
                <Typography fontSize={17} fontWeight={500}>
                  {data.address}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: "#FAFFF9", borderRadius: 3, p: 2, mb: 1 }}>
                <Typography
                  color="text.secondary"
                  fontSize={15}
                  sx={{ mb: 0.5 }}
                >
                  Favourite
                </Typography>
                <Switch checked={!!data.favourite} disabled color="warning" />
              </Box>
            </Box>
            {/* Delete Button */}
            <Box sx={{ px: 2, pb: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
                fullWidth
                sx={{ mt: 2, bgcolor: "#ff6363" }}
                onClick={handleOpenDeleteDialog}
              >
                Delete Contact
              </Button>
            </Box>
            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog} onClose={handleCloseDeleteDialog}>
              <DialogTitle>Delete Contact</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to delete this contact?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteDialog}>No</Button>
                <Button onClick={handleDelete} color="error">
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ContactDetailsPage;
