import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ options, search }) => {
  const [topic, setTopic] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(async () => {
    console.log(topics);
    const last = topics.length - 1 >= 0 ? topics.length - 1 : 0;
    if (topics[last]) search(topics[last]);
  }, [topics]);

  return (
    <div className="search-bar">
      <Box mb={1}>
        <Stack direction="row" spacing={1}>
          {topics.map((value, idx) => (
            <Chip label={value} idx={idx} variant="outlined" />
          ))}
        </Stack>
      </Box>

      <div className="search-area">
        <TextField
          id="outlined-basic"
          label="Search Topic"
          variant="outlined"
          value={topic}
          sx={{ marginRight: 1 }}
          onChange={(e) => setTopic(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          style={{ display: "block" }}
          onClick={(e) => {
            if (topic !== "") {
              setTopics([...topics, topic]);
              setTopic("");
            }
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          style={{ display: "block" }}
          onClick={(e) => {
            setTopics([]);
          }}
        >
          clear
        </Button>
      </div>
    </div>
  );
};
export default SearchBar;
