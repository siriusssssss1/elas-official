import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { getNotesByCourseAndNoteTitle } from "../utils/api";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = async () => {
    // Make sure searchValue is defined before making the API call
    if (searchValue) {
      try {
        let elasUser = JSON.parse(sessionStorage.getItem("elas-user"));
        const result = await getNotesByCourseAndNoteTitle(searchValue, elasUser.id);
        console.log(result);
        navigate("/projects/notebot/search", {
          state: { searchResults: result.cards, keyword: searchValue },
        });
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    } else {
      console.error("Search value is undefined or empty.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div>
      <Toolbar
        style={{
          marginLeft: "80px",
          width: "80%",
          backgroundColor: "transparent",
          padding: "0",
        }}
      >
        <div
          style={{
            marginTop: "-30px",
            position: "relative",
            borderRadius: "0px",
            backgroundColor: "transparent",
            width: "80%",
            height: "120%",
          }}
        >
          <div
            style={{
              padding: "8px",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleSearchClick}
          >
            <SearchIcon style={{ color: "#ED7D31" }} />
          </div>

          <TextField
            placeholder="SEARCH…"
            style={{ padding: "8px 48px", width: "100%", color: "transparent" }}
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            variant="standard"
          />
        </div>
      </Toolbar>
    </div>
  );
};

export default Search;
