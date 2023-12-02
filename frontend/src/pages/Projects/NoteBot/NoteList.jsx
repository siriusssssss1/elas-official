import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";

export default function NoteList() {
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
            style={{ padding: "20px", backgroundColor: "#767676" }} // Hintergrundfarbe
          >
            <Typography variant="body1">Das hier ist eine Notiz</Typography>
            {/* Weitere Inhalte können hier hinzugefügt werden */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
