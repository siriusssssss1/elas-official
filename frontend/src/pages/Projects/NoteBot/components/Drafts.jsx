import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import DraftCard from "./DraftCard";

import { getDrafts } from "../utils/api";
import { deleteNoteFromServer } from "../utils/api.js";

// The Drafts component is responsible for displaying the list of draft notes
export default function Drafts() {
  // State to store the draft cards and any messages (e.g., errors)
  const [cards, setCards] = useState({
    message: "",
    cards: [],
  });

  // useEffect hook to fetch the draft cards from the server when the component mounts
  useEffect(() => {
    async function getCardInfo() {
      const cardsInfo = await getDrafts(); // Fetching draft cards from the server

        // Updating the state with the fetched cards or an error message
      if (cardsInfo.cards !== undefined) {
        setCards(cardsInfo);
        console.log(cardsInfo);
        // notifyUserOfError(error);
      } else {
        setCards((prevState) => ({
          ...prevState,
          message: cardsInfo.message,
        }));
      }
    }
    getCardInfo();
  }, []);

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNoteFromServer(noteId);
      // If the deletion on the server is successful, update the state
      const updatedData = cards.cards.filter((card) => card.id !== noteId);
      setCards((prevState) => ({
        ...prevState,
        cards: updatedData,
      }));
      
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Rendering the Drafts component
  return (
    <Grid container spacing={2} sx={{ maxWidth: 1500, width: "100%" }}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          style={{ color: "#A5A5A5", marginBottom: "20px" }}
        >
          My Drafts
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        {cards.cards.map((card) => (
          <DraftCard
            key={card.id}
            card={card}
            style={{ marginBottom: "20px" }}
            handleDeleteNote={handleDeleteNote} // Passing the delete handler function to each DraftCard
          />
        ))}
      </Grid>
    </Grid>
  );
}
