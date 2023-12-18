import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Button } from '@mui/material'; 

export default function MyNotes() {
  return (

      <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
        <Grid item>
          <Typography>My Notes</Typography>
          <Button variant="outlined">Outlined</Button>
        </Grid>
      </Grid>
  
  );
}
