import React from "react";
import { Box, Paper, IconButton, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

function EditNote() {
  const handleAddSection = () => {
    console.log("Add Section Clicked");
  };

  // Diese Funktion könnte für das Hinzufügen von Widgets verwendet werden
  const handleAddWidget = (widgetType) => {
    console.log("Add Widget:", widgetType);
  };

//raw code
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        {/* Texteditor Bereich */}
        <Box sx={{ border: "1px solid #ccc", minHeight: "150px", padding: 1 }}>
          {/* Hier könnten Sie einen echten Texteditor wie 'react-quill' integrieren */}
          <Typography variant="body1">Texteditor</Typography>
        </Box>
        {/* Widget Auswahl Bereich */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <IconButton onClick={() => handleAddWidget("text")} 
          sx={{
            color: "white",
            bgcolor: "blue", // Blauer Hintergrund für das Text-Widget
            "&:hover": {
              bgcolor: "darkblue", // Dunkleres Blau beim Hover
            },
            borderRadius: "50%",
          }}
          >
            <TextFieldsIcon />
          </IconButton>
          <IconButton onClick={() => handleAddWidget("pdf")}
          sx={{
            color: "white",
            bgcolor: "orange", // Orangener Hintergrund für das PDF-Widget
            "&:hover": {
              bgcolor: "darkorange", // Dunkleres Orange beim Hover
            },
            borderRadius: "50%",
            marginLeft: 1, // Fügt Abstand zwischen den Icons hinzu
          }}
          >
            <PictureAsPdfIcon />
          </IconButton>
          <IconButton onClick={() => handleAddWidget("video")}
          sx={{
            color: "white",
            bgcolor: "red", // Roter Hintergrund für das Video-Widget
            "&:hover": {
              bgcolor: "darkred", // Dunkleres Rot beim Hover
            },
            borderRadius: "50%",
            marginLeft: 1, // Fügt Abstand zwischen den Icons hinzu
          }}
          >
            <PlayCircleFilledIcon />
          </IconButton>
        </Box>
      </Paper>
      
    </Box>
  );
}

export default EditNote;
