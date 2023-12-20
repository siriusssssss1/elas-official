import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";

export default function AddNote() {
  return (
    <Grid container sx={{ maxWidth: 1500, width: "100%" }} spacing={2}>
      <Grid item>
        <Typography>Add Note</Typography>
      </Grid>
    </Grid>
  );
}

return (
  <Container maxWidth="md" sx={{ marginTop: 5 }}>
    <PageHeader
      title="My Notes"
      isEditable={false}
      variant={"standard"}
      InputProps={{ classes }}
      size="large"
      actions={[
        {
          label: "Add Note",
          startIcon: <AddIcon />,
          onClick: () => navigate("/notes/create"),
          color: "primary",
        },
        // {
        //   label: "Add Course",
        //   startIcon: <AddIcon />,
        //   onClick: () => navigate("/courses"),
        //   disableElevation: true,
        // },
      ]}
    />
  </Container>
);
