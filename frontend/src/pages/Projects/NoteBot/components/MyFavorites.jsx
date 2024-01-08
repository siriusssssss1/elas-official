import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
      <Grid item>
        <Typography variant="h5" style={{ color: "#A5A5A5" }}>
          My Favorites
        </Typography>
      </Grid>
      <Grid item>
        {favoriteCards.cards.map((card) => (
          <Card style={{ minWidth: 275, marginBottom: 20}} key={card.id}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {card.title}
              </Typography>
            </CardContent>
            <CardContent>
              <FavoriteIcon color="error" />
            </CardContent>
            <CardContent style={{ position: "absolute", bottom: 0, right: 0, padding: "8px" }}>
              <DeleteIcon style={{ color: "#A5A5A5" }} />
            </CardContent>
            
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}
