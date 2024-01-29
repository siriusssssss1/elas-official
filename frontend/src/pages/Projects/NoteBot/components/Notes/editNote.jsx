import React from "react";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import TextField from "@mui/material/TextField";

function EditNote() {
  const handleAddSection = () => {
    console.log("Add Section Clicked");
  };

  const handleAddWidget = (widgetType) => {
    console.log("Add Widget:", widgetType);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          {/* Texteditor Bereich */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ border: "1px solid #ccc", minHeight: "150px", padding: 1 }}
            >
              <TextField fullWidth label="Edit This  Note" id="fullWidth" />
            </Box>
          </Grid>
          {/* Widget Auswahl Bereich */}
          <Grid item xs={12} md={6}>
            {/* Hier können Sie die rechte Seite mit Inhalten füllen */}
            <Box sx={{ height: "150px", padding: 1, border: "1px solid #ccc" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // Stapelt die Elemente vertikal
                  alignItems: "center", // Zentriert die Elemente horizontal
                  justifyContent: "center", // Zentriert die Elemente vertikal, wenn es zusätzlichen Platz gibt
                  marginTop: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
                  Choose a widget
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row", // Ordnet die Icons horizontal an
                    alignItems: "center", // Zentriert die Icons vertikal
                    justifyContent: "center", // Zentriert die Icons horizontal
                  }}
                >
                  <IconButton onClick={() => handleAddWidget("text")}>
                    <TextFieldsIcon />
                  </IconButton>
                  <IconButton onClick={() => handleAddWidget("pdf")}>
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton onClick={() => handleAddWidget("video")}>
                    <PlayCircleFilledIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Hier können Sie die Widgets hinzufügen */}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default EditNote;
