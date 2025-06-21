import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useContactStore from "../../store/contactStore";

const SearchBar = () => {
  const search = useContactStore((state) => state.search);
  const setSearch = useContactStore((state) => state.setSearch);

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 4,
        px: 2,
        py: 0.5,
        flex: 1,
        bgcolor: "#F5F8F6",
      }}
    >
      <SearchIcon color="action" sx={{ fontSize: 23 }} />
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: 16, color: "text.primary" }}
        placeholder="Search"
        inputProps={{ "aria-label": "search contacts" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Paper>
  );
};

export default SearchBar;
