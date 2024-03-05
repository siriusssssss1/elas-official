import React from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Divider, Box } from "@mui/material";
import NoteCard from "./noteCard.jsx";
import noteBotLogo from "../../../../assets/images/noteBot-logo.png";
import Search from "./Search.jsx";

const searchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults || [];
  const keyword = location.state.keyword || "";
  console.log("Search Results:", searchResults);

  return (
    <Box textAlign="center" p={3}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <img
            src={noteBotLogo}
            alt="NoteBot Logo"
            style={{
              width: "100%",
              maxWidth: "200px",
              paddingBottom: 20,
              paddingTop: 6,
            }}
          />
        </Grid>
        <Grid item>
          <Search />
        </Grid>
      </Grid>
      <Divider />

      {searchResults.length === 0 ? (
        <>
          <Typography variant="h4" mt={2} mb={1}>
            No results found for '{keyword}'
          </Typography>
          <Typography variant="h5" color="black" mb={2}>
            Try another search term.
          </Typography>
          <Divider />
        </>
      ) : (
        <>
          <Typography variant="h4" mt={2} mb={2} align="left">
            Search Results for: {keyword}
          </Typography>

          <Grid container spacing={2}>
            {searchResults.map((card) => (
              <NoteCard
                key={card._id}
                card={card}
                style={{ marginBottom: "20px" }}
              />
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default searchResultsPage;
