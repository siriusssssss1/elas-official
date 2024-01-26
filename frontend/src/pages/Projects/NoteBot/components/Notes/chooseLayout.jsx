import React from "react";
import {
  Box,
  Paper,
  Grid,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";

const ChooseLayout = ({ onLayoutSelect }) => {
  const handleLayoutClick = (layout) => {
    console.log("Layout gewählt:", layout);
    onLayoutSelect(layout);
  };

  // Hier fügen Sie Ihr Layout entsprechend der hochgeladenen Datei ein
  // Zum Beispiel könnte es so aussehen (passen Sie dies an Ihr Design an):
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {" "}
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginY: "30px",
          padding: "20px",
          width: "inherit", // Um sicherzustellen, dass Paper die Breite der umgebenden Box erbt
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography
          variant="h6"
          sx={{ width: "100%", textAlign: "center", marginBottom: "20px" }}
        >
          CHOOSE A LAYOUT
        </Typography>

        <Grid container spacing={1} justifyContent="center">
          {/* Erster Grid-Container als Grid-Item */}
          {/* <Grid item xs={1}>
              <Card sx={{ backgroundColor: "#e0e0e0", height: "100px" }}></Card>
            </Grid> */}

          {/* Zweiter Grid-Container als Grid-Item */}
          <Grid item container spacing={1.5} justifyContent="center">
            <Grid item xs={1.6}>
              <CardActionArea onClick={() => handleLayoutClick("layout1")}>
                <Card
                  sx={{ backgroundColor: "#e0e0e0", height: "100px" }}
                ></Card>
              </CardActionArea>
            </Grid>
            <Grid item xs={1.6}>
              <CardActionArea onClick={() => handleLayoutClick("layout2")}>
                <Card
                  sx={{ backgroundColor: "#e0e0e0", height: "100px" }}
                ></Card>
              </CardActionArea>
            </Grid>
          </Grid>
          {/* Dritter Grid-Container als Grid-Item */}
          {/* <Grid item container spacing={1.5} justifyContent="center">
              <Grid item xs={1.4}>
                <Card
                  sx={{ backgroundColor: "#e0e0e0", height: "100px" }}
                ></Card>
              </Grid>
              <Grid item xs={1.4}>
                <Card
                  sx={{ backgroundColor: "#e0e0e0", height: "100px" }}
                ></Card>
              </Grid>
              <Grid item xs={1.4}>
                <Card
                  sx={{ backgroundColor: "#e0e0e0", height: "100px" }}
                ></Card>
              </Grid>
            </Grid> */}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ChooseLayout;
export const LayoutSelector = ChooseLayout;
