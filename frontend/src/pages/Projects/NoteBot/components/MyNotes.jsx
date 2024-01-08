import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
//import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { getCards } from "../utils/api";

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

  return (
    <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
      <Grid item>
        <Typography>My Notes</Typography>
      </Grid>
      <Grid item>
        {cards.cards.map((card) => (
          <Card style={{ minWidth: 275 }} key={card.id}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {card.title}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {card.isFavorite ? "Favorit" : "Nicht Favorit"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}