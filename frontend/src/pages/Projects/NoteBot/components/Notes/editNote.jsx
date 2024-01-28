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
      </Paper>
      {/* Button zum Hinzufügen neuer Abschnitte */}
      {/* <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddSection}
      >
        ADD A SECTION
      </Button> */}
    </Box>
  );
}

export default EditNote;
