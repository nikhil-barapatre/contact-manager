import { FormControlLabel, Switch, Typography } from "@mui/material";
import {
  useShowFavouritesOnly,
  useSetShowFavouritesOnly,
} from "../../hooks/useZustandSelectors";

const FavouritesToggle = () => {
  const showFavouritesOnly = useShowFavouritesOnly();
  const setShowFavouritesOnly = useSetShowFavouritesOnly();

  return (
    <FormControlLabel
      control={
        <Switch
          checked={showFavouritesOnly}
          onChange={(e) => setShowFavouritesOnly(e.target.checked)}
          color="warning"
        />
      }
      label={
        <Typography fontSize={16} color="text.primary">
          Favourites
        </Typography>
      }
      sx={{ flexShrink: 0 }}
    />
  );
};

export default FavouritesToggle;
