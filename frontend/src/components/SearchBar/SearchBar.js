import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './SearchBar.css'


const SearchBar = ({options }) => {
  return (
    <div className='search-bar'>
    <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={options}
  sx={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="Search" />}
  
/>
<Button variant="text" style={{display:"block"}}>Add</Button>
</div>
  );
};
export default SearchBar;
