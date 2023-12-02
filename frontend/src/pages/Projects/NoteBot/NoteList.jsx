import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { purple } from "@mui/material/colors";

export default function NoteList() {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Typography> NoteList </Typography>
      <Button variant="contained"> ADD NOTE </Button>
    </Grid>
  );
}
