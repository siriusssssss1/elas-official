import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getCards } from "../utils/api";

export default function MyFavorites() {
  const [favoriteCards, setFavoriteCards] = useState({
    message: "",
    cards: [],
  });

  useEffect(() => {
    async function getFavoriteCards() {
      const cardsInfo = await getCards();

      if (cardsInfo.cards !== undefined) {
        const favorites = cardsInfo.cards.filter((card) => card.isFavorite);
        setFavoriteCards({ cards: favorites });
        console.log(favorites);
      } else {
        setFavoriteCards((prevState) => ({
          ...prevState,
          message: cardsInfo.message,
        }));
      }
    }
    getFavoriteCards();
  }, []);

  
  const handleDeleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Möchten Sie diese Notiz wirklich löschen?"
    );

    if (confirmDelete) {
      // Führen Sie hier den tatsächlichen Löschvorgang durch
      console.log(`Notiz mit der ID ${id} wurde gelöscht.`);
    }
  };

  return (
    <Grid container direction="column" sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ color: "#A5A5A5", marginBottom: "20px" }}>
          My Favorites
        </Typography>
      </Grid>
      <Grid item>
        {favoriteCards.cards.map((card) => (
          <Card
            style={{
              width: 275,
              marginBottom: 20,
              position: "relative",
              height: "200px",
              backgroundColor: "#d9d9d9",
            }}
            key={card.id}
          >
            <CardContent>
              <Typography
                color="textSecondary"
                variant="h6"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                {card.title}
              </Typography>
              <Stack spacing={1} direction="row" alignItems="flex-end" justifyContent="flex-start" style={{ position: 'absolute', bottom: '8px', left: '8px'}}>
                <Rating name={`rating-${card.id}`} value={card.rating} precision={0.5} readOnly />
              </Stack>
            </CardContent>
            <CardContent style={{ position: "absolute", top: 0, right: 0 }}>
              {card.isFavorite ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon color="error" />
              )}
            </CardContent>
            <CardContent style={{ position: "absolute", bottom: 0, right: 0, padding: "8px",}}>
              <DeleteIcon
                style={{ color: "#A5A5A5" }}
                onClick={() => handleDeleteNote(card.id)}
              />
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}
