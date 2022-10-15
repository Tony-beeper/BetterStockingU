import { IconButton } from "@material-ui/core";
// import { SearchIcon } from "@mui-ui/core/Search";
import { TextField } from "@material-ui/core";

const SearchBar = ({ setSearchQuery, searchQuery }) => {
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
        value={searchQuery}
      />
      <IconButton type="submit" aria-label="search">
        <div style={{ fill: "blue" }} />
      </IconButton>
    </form>
  );
};
export default SearchBar;
