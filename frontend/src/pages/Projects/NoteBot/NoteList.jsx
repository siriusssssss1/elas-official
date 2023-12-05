import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";
//import { useHistory } from "react-router-dom";

export default function NoteList() {
  //const history = useHistory();

  //const handleBoxClick = () => {
  // Hier kannst du die URL oder den Pfad zur neuen Seite angeben
  //const newPath = "/neue-seite";
  // Hier wird die Navigation zur neuen Seite ausgelöst
  //history.push(newPath);
  //};

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6">NoteList</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            ADD NOTE
          </Button>
        </Grid>
        <Grid item>
          <Paper
            elevation={3} // Einstellung für die Schattenstärke
            style={{
              padding: "20px",
              margin: "10px",
              backgroundColor: "#D9D9D9",
              height: "200px", // Höhe anpassen
              width: "250px", // Breite anpassen}} // Hintergrundfarbe
            }}
          >
            <Typography variant="body1" style={{ color: "white" }}>
              Das hier ist eine Notiz
            </Typography>
            {/* Weitere Inhalte können hier hinzugefügt werden */}
          </Paper>

          <Paper
            elevation={3} // Einstellung für die Schattenstärke
            style={{
              padding: "20px",
              margin: "10px",
              backgroundColor: "#D9D9D9",
              height: "200px", // Höhe anpassen
              width: "250px", // Breite anpassen}} // Hintergrundfarbe
            }}
          >
            <Typography variant="body1" style={{ color: "white" }}>
              Das hier ist eine Notiz
            </Typography>
            {/* Weitere Inhalte können hier hinzugefügt werden */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
