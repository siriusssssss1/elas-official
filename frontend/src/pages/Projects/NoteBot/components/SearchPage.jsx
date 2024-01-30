// SearchResultsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Typography, Divider, Box } from "@mui/material";
import NoteCard from "./NoteCard";


const SearchResultsPage = () => {
    const location = useLocation();
  const searchResults = location.state.searchResults || [];
  const keyword = location.state.keyword || '';
  console.log("Search Results:", searchResults)

  return (
    <Box textAlign="center" p={3}>
      <Divider />
      {searchResults.length === 0 ? (
      <>
        <Typography variant="h4" mt={2} mb={1}>
            No results found for '{keyword}'
          </Typography>
          <Typography variant="h5" color="black" mb={2} >
            Try another search term.
        </Typography>
        <Divider />
        </>
      ) : (
        <>
      <h1>Search Results for: {keyword} </h1>
      <Grid item container spacing={2}>
        {searchResults.map((card) => (
          <NoteCard 
          key={card.id} 
          card={card} 
          style={{ marginBottom: "20px" }}
        //   handleDeleteNote={handleDeleteNote}
        //   handleToggleFavorite={handleToggleFavorite}
        />
        ))}
      </Grid>
      </>
      )}
    </Box>
  );
};

export default SearchResultsPage;

