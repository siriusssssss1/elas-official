import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { getFavNotes } from "../utils/api";
import NoteCard from "./NoteCard";
import { toggleFavNote } from "../utils/api";

export default function MyFavorites() {
  const [favoriteCards, setFavoriteCards] = useState({
    message: "",
    cards: [],
  });

  // Zustandsvariable für das Tracking von Änderungen
  const [favoritesChanged, setFavoritesChanged] = useState(false);

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
    getFavoriteCards();
  }, [favoritesChanged]); // Abhängigkeit hinzugefügt

  const handleToggleFavorite = async (id) => {
    try {
      // Der API-Aufruf zum Umschalten des Favoritenstatus, der die Notiz-ID erwartet
      await toggleFavNote(id);

      // Aktualisieren Sie favoritesChanged, um den useEffect-Hook zu triggern
      setFavoritesChanged(!favoritesChanged);
    } catch (error) {
      // Fehlerbehandlung, falls der API-Aufruf fehlschlägt
      console.error("Error toggling favorite status:", error);
    }
  };

  // if (cardsInfo.cards !== undefined) {
  //   const favorites = cardsInfo.cards.filter((card) => card.isFavorite);
  //   setFavoriteCards({ cards: favorites });
  //   console.log(favorites);
  // } else {
  //   setFavoriteCards((prevState) => ({
  //     ...prevState,
  //     message: cardsInfo.message,
  //   }));
  // }
  //   }
  //   getFavoriteCards();
  // }, []);

  const handleDeleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Möchten Sie diese Notiz wirklich löschen?"
    );

    if (confirmDelete) {
      // Führen Sie hier den tatsächlichen Löschvorgang durch
      console.log(`Notiz mit der ID ${id} wurde gelöscht.`);
    }
  };

  // table with two columns that represents favorite notes & favorite courses
  return (
    <Grid display={"flex"} flexDirection={"column"}>

      {/* Header */}
      <Grid
        display={"flex"}
        marginX={4} // Einrückung Linie unter Überschriften
        sx={{
          borderBottom: 1,
        }}
      >
        {/* Left side header */}
        <Grid item width={0.5} marginLeft={8}>
          <Typography
            variant="h5"
            style={{ color: "#A5A5A5", marginBottom: "20px" }}
          >
            My Favorite Courses
          </Typography>
        </Grid>

        {/* Right side header */}
        <Grid item width={0.5} marginLeft={8}>
          <Typography
            variant="h5"
            style={{ color: "#A5A5A5", marginBottom: "20px" }}
          >
            My Favorite Notes
          </Typography>
        </Grid>
      </Grid>

      {/* Cards */}

      <Grid container sx={{ maxWidth: 1500, width: "100%" }}>
        {/* Left side grid */}
        <Grid
          width={0.5}
          paddingTop={4}
          paddingRight={4}
          sx={{
            borderRight: 1,
            "& > div": {
              display: "grid",
            },
          }}
        >
          {/* <Grid item>
            {Array(2)
              .fill(favoriteCards.cards)
              .flat()
              .map((card) => (
                <NoteCard key={card.id} card={card} />
              ))}
          </Grid> */}
        </Grid>

        {/* Right side grid */}
        <Grid width={0.5} paddingTop={4} paddingLeft={4}>
          <Grid
            item
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
          >
            {Array(1)
              .fill(favoriteCards.cards)
              .flat()
              .map((card) => (
                <NoteCard
                  key={card.id}
                  card={card}
                  handleDeleteNote={handleDeleteNote}
                  handleToggleFavorite={handleToggleFavorite}
                />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
