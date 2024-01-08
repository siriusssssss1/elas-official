import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

export default function Drafts() {
  return (
    <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
      <Grid item>
      <Typography variant="h5" style={{ color: "#A5A5A5" }}>Drafts</Typography>
      </Grid>
    </Grid>
  );
}


