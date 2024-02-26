import React from "react";
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import TextField from "@mui/material/TextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";


function EditNote() {

  const [selectedWidgetLeft, setSelectedWidgetLeft] = useState(null);
  const [selectedWidgetRight, setSelectedWidgetRight] = useState(null);

  const handleAddWidgetLeft = (widgetType) => {
    setSelectedWidgetLeft(widgetType);
  };

  const handleAddWidgetRight = (widgetType) => {
    setSelectedWidgetRight(widgetType);
  };

  // Individual widgets are declared
  const TextWidget = () => (
    <TextField fullWidth label="Your Text" variant="outlined" multiline />
  );
  const PdfWidget = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
     <div style={{ textAlign: "center" }}>
      <UploadFileIcon sx={{ fontSize: 60, color: "#ED7D31" }} />
      <div style={{ color: "#ED7D31" }}>
         UPLOAD FILE
      </div>
    </div>
    </Box>
  );
   const VideoWidget = () => (
    <TextField fullWidth label="Video Link" variant="outlined" />
  );


  const WidgetArea = ({ onAddWidget, selectedWidget }) => (
    <Box sx={{ height: "150px", padding: 1, border: "1px solid #ccc" }}>
      {!selectedWidget && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 2,
            }}
          ></Box>

          <Typography
            variant="subtitle2"
            sx={{ marginBottom: 2, color: "#767676" }}
          >
            CHOOSE A WIDGET
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", 
              marginLeft: "auto", 
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => onAddWidget("text")}
              sx={{
                color: "white",
                bgcolor: "#4472C4",
                "&:hover": { bgcolor: "darkblue" },
                borderRadius: "50%",
              }}
            >
              <TextFieldsIcon />
            </IconButton>
            <IconButton
              onClick={() => onAddWidget("pdf")}
              sx={{
                color: "white",
                bgcolor: "#ED7D31",
                "&:hover": { bgcolor: "darkorange" },
                borderRadius: "50%",
                marginLeft: 1,
              }}
            >
              <PictureAsPdfIcon />
            </IconButton>
            <IconButton
              onClick={() => onAddWidget("video")}
              sx={{
                color: "white",
                bgcolor: "#F91313",
                "&:hover": { bgcolor: "darkred" },
                borderRadius: "50%",
                marginLeft: 1,
              }}
            >
              <PlayCircleFilledIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {selectedWidget === "text" && <TextWidget />}
      {selectedWidget === "pdf" && <PdfWidget />}
      {selectedWidget === "video" && <VideoWidget />}
    </Box>
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>

          {/* Left Side */}
          <Grid item xs={12} md={6}>
            <WidgetArea
              onAddWidget={handleAddWidgetLeft}
              selectedWidget={selectedWidgetLeft}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={12} md={6}>
            <WidgetArea
              onAddWidget={handleAddWidgetRight}
              selectedWidget={selectedWidgetRight}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default EditNote;