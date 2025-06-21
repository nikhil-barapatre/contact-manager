import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ContactCard = ({ contact, onCardClick, onFavouriteToggle }) => {
  return (
    <ListItemButton
      onClick={onCardClick}
      sx={{
        width: "100%",
        bgcolor: "#FAFFF9",
        "&:hover": { bgcolor: "#FFECE2" },
        borderRadius: 3,
        p: 1,
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{
            bgcolor: "#FA6F42",
            color: "white",
            width: 48,
            height: 48,
            fontSize: 22,
            mr: 1,
          }}
        >
          {contact.name?.[0]?.toUpperCase() || "?"}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography fontSize={17} fontWeight={600} color="text.primary">
            {contact.name}
          </Typography>
        }
        secondary={
          <Typography fontSize={14} color="text.secondary">
            {contact.email}
          </Typography>
        }
      />
      <Tooltip
        title={
          contact.favourite ? "Remove from Favourites" : "Mark as Favourite"
        }
        arrow
      >
        <IconButton
          edge="end"
          disableRipple
          tabIndex={-1}
          sx={{ ml: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteToggle(e, contact);
          }}
          aria-label={
            contact.favourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          {contact.favourite ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon color="disabled" />
          )}
        </IconButton>
      </Tooltip>
    </ListItemButton>
  );
};

export default ContactCard;
