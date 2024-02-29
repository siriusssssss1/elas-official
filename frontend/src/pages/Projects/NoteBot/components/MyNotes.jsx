import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import NoteCard from "./noteCard.jsx";
import {
  getCards,
  deleteNoteFromServer,
  toggleFavNote,
  setRatingOnServer,
} from "../utils/api.js";

export default function myNotes() {
  const [cards, setCards] = useState({
    message: "",
    cards: [],
  });
  const [favoriteCards, setFavoriteCards] = useState({
    message: "",
    cards: [],
  });

  // Sends API request to retrieve a list of notes/cards.
  useEffect(() => {
    async function getFavoriteCards() {
      const cardsInfo = await getFavNotes();

      if (cardsInfo.cards !== undefined) {
        setFavoriteCards({ cards: cardsInfo.cards });
      } else {
        setFavoriteCards((prevState) => ({
          ...prevState,
          message: cardsInfo.message,
        }));
      }
    }

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
    getFavoriteCards();
  }, []);

  const handleToggleFavorite = async (id) => {
    try {
      await toggleFavNote(id); // from server
      // Update the local state here to show the change immediately
      // ToDo: Handle local adding / removal of a favorite card
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
      console.error("Error deleting note:", error);
    }
  };

  const handleRatingNote = async (noteId, rating) => {
    try {
      const ratedNoteData = await setRatingOnServer(
        // Change to variable userId
        "a19d4fd7-2052-42e4-8ab2-56db09944363",
        noteId,
        rating
      );
      const updatedNote = ratedNoteData.note;

      // If rating on the server is successful, update the state
      const updatedData = cards.cards.map((card) => {
        if (card.id === updatedNote.id) {
          return { ...card, ratings: updatedNote.ratings };
        }
        return card;
      });
      setCards((prevState) => ({
        ...prevState,
        cards: updatedData,
      }));
    } catch (error) {
      console.error("Error updating note rating:", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: 1500, width: "100%" }}>
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
            isFavorite={
              favoriteCards.cards.find((fav) => fav.id === card.id)
                ? true
                : false
            }
            style={{ marginBottom: "20px" }}
            handleDeleteNote={handleDeleteNote}
            handleToggleFavorite={handleToggleFavorite}
            handleRatingNote={handleRatingNote}
          />
        ))}
      </Grid>
    </Grid>
  );
}
