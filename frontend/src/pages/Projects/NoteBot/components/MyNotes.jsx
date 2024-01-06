import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { getCards } from "../utils/api";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyNotes() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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
        {cards.cards.map((card) => {
          // Generate Card UI
          return (
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {card.title}
                </Typography>
              </CardContent>
              {card.isFavorite ? (
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Favorit
                  </Typography>
                </CardContent>
              ) : (
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Nicht Favorit
                  </Typography>
                </CardContent>
              )}
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}
