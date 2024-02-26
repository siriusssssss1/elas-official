import React from "react";
import {
  Box,
  Paper,
  Grid,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";

// Layout1 Komponente
const Layout1 = () => (
  <Box
    sx={{
      display: "flex",
      width: "100%",
      height: "100px",
      backgroundColor: "#e0e0e0",
    }}
  />
);

// Layout2 Komponente
const Layout2 = () => (
  <Box sx={{ display: "flex", width: "100%", height: "100px" }}>
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#e0e0e0",
        borderRight: "2px solid #fff",
      }}
    />
    <Box sx={{ flex: 1, backgroundColor: "#e0e0e0" }} />
  </Box>
);

// Layout3 Komponente
const Layout3 = () => (
  <Box sx={{ display: "flex", width: "100%", height: "100px" }}>
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#e0e0e0",
        borderRight: "2px solid #fff",
      }}
    />
    <Box
      sx={{
        flex: 1,
        backgroundColor: "#e0e0e0",
        borderRight: "2px solid #fff",
        marginX: "4px",
      }}
    />
    <Box sx={{ flex: 1, backgroundColor: "#e0e0e0" }} />
  </Box>
);

const ChooseLayout = ({ onLayoutSelect }) => {
  const handleLayoutSelection = (layout) => {
    console.log("Layout gewählt:", layout);     // "Layout gewählt: Layout1"
    onLayoutSelect(layout);
  };

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
          width: "inherit", 
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
          <Grid item container spacing={1.5} justifyContent="center">
            <Grid item xs={1.6}>
              <CardActionArea onClick={() => handleLayoutSelection("layout1")}>
                <Card
                  sx={{
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <Layout1 />
                </Card>
              </CardActionArea>
            </Grid>

            <Grid item xs={1.6}>
              <CardActionArea onClick={() => handleLayoutSelection("layout2")}>
                <Card
                  sx={{
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <Layout2 />
                </Card>
              </CardActionArea>
            </Grid>
            
            <Grid item xs={1.6}>
              <CardActionArea onClick={() => handleLayoutSelection("layout3")}>
                <Card
                  sx={{
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                  }}
                >
                  <Layout3 />
                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ChooseLayout;
export const LayoutSelector = ChooseLayout;
