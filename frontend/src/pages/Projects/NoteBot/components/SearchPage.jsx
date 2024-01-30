// SearchResultsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from "@mui/material";
import NoteCard from "./NoteCard";


const SearchResultsPage = () => {
    const location = useLocation();
  const searchResults = location.state.searchResults || [];
  const keyword = location.state.keyword || '';
  console.log("Search Results:", searchResults)

  return (
    
    <div>
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
    </div>
  );
};

export default SearchResultsPage;

