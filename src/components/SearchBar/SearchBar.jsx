import { TextField } from '@mui/material';
import { useSearch, useSetSearch } from '../../hooks/useZustandSelectors';

const SearchBar = () => {
  const search = useSearch();
  const setSearch = useSetSearch();

  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder="Search contact"
      value={search}
      onChange={e => setSearch(e.target.value)}
      sx={{ flex: 1, mr: 1 }}
    />
  );
};

export default SearchBar;
