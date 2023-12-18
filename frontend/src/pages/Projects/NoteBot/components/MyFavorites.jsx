import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

export default function MyFavorites() {
  return (
    <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
      <Grid item>
        <Typography>My Favorites</Typography>
      </Grid>
    </Grid>
  );
}
