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
    await deleteNoteFromServer(noteId);
  // Zustand aktualisieren, um die Notiz aus der UI zu entfernen
  setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));

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


