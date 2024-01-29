import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import DraftCard from "./DraftCard";

import { getDrafts } from "../utils/api";
import { deleteNoteFromServer } from '../utils/api.js';


export default function Drafts() {
  const [cards, setCards] = useState({
    message: "",
    cards: [],
  });

  useEffect(() => {
    async function getCardInfo() {
      const cardsInfo = await getDrafts();

      if (cardsInfo.cards !== undefined) {
        setCards(cardsInfo);
        console.log(cardsInfo);
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
      // Handle any errors that occur during the server operation
      console.error("Error deleting note:", error);
    }
  };


  return (
    <Grid container spacing={2} sx={{ maxWidth: 1500, width: "100%" }} > 
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

          
          <DraftCard key={card.id} card={card} style={{ marginBottom: "20px" }} handleDeleteNote={handleDeleteNote}/>

        ))}
      </Grid>
    </Grid>
  );
}


