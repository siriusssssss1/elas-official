import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import NoteCard from "./NoteCard";

import { getDrafts } from "../utils/api";

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


  // return (
  //   <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
  //     <Grid item>
  //     <Typography variant="h5" style={{ color: "#A5A5A5" }}>Drafts</Typography>
  //     </Grid>
  //   </Grid>
  // );

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

          
          <NoteCard key={card.id} card={card} style={{ marginBottom: "20px" }}/>

        ))}
      </Grid>
    </Grid>
  );
}


