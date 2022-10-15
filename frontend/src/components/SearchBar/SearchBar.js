import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = ({options }) => {
  return (
    <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={options}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Movie" />}
/>
  );
};
export default SearchBar;
