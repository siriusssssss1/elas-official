import React, { useState, useEffect } from "react";
import { Grid, Typography} from "@mui/material";
import NoteCard from "./NoteCard";

import { getCards } from "../utils/api";
//import {handleDeleteConfirm} from "./NoteCard";
import { deleteNoteFromServer } from '../utils/api.js';
import { toggleFavNote } from '../utils/api.js';


export default function MyNotes() {
  const [cards, setCards] = useState({
    message: "",
    cards: [],
  });

  useEffect(() => {
    async function getCardInfo() {
      const cardsInfo = await getCards();

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
  // const handleDeleteNote = (id) => {
  //   const updatedCards = cards.cards.filter((card) => card.id !== id);
  //   setCards({ message: cards.message, cards: updatedCards });
  // };
  // const handleDeleteNote = (id) => {
  //  const confirmDelete = window.confirm(
  //    "Möchten Sie diese Notiz wirklich löschen?"
  //  );
  //  if (confirmDelete) {  
  //    console.log(`Notiz mit der ID ${id} wurde gelöscht.`);
  //  }
  // };


  // const handleToggleFavorite = (id) => {
  //   setCards((prevCards) => {
  //     const updatedCards = prevCards.cards.map((card) =>
  //       card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
  //     );
  //     return { message: prevCards.message, cards: updatedCards };
  //   });
  // };
  const handleToggleFavorite = async (id) => {
    try {
      await toggleFavNote(id);
      // Aktualisieren Sie hier den lokalen Zustand, um die Änderung sofort anzuzeigen
      setFavoriteCards(prevCards => {
        const updatedCards = prevCards.cards.map(card => {
          if (card.id === id) {
            return { ...card, isFavorite: !card.isFavorite };
          }
          return card;
        });
        return { ...prevCards, cards: updatedCards };
      });
    } catch (error) {
      console.error("Fehler beim Umschalten des Favoritenstatus:", error);
    }
  };

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
          My Notes
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        {cards.cards.map((card) => (

          <NoteCard 
          key={card.id} 
          card={card} 
          style={{ marginBottom: "20px" }}
          handleDeleteNote={handleDeleteNote}
          handleToggleFavorite={handleToggleFavorite}/>

        ))}
      </Grid>
    </Grid>
  );
}
