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
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";

function EditNote() {
  const handleAddSection = () => {
    console.log("Add Section Clicked");
  };

  const [selectedWidgetLeft, setSelectedWidgetLeft] = useState(null);
  const [selectedWidgetRight, setSelectedWidgetRight] = useState(null);

  const handleAddWidgetLeft = (widgetType) => {
    setSelectedWidgetLeft(widgetType);
  };

  const handleAddWidgetRight = (widgetType) => {
    setSelectedWidgetRight(widgetType);
  };

  // Komponente für das Text-Widget
  const TextWidget = () => (
    <TextField fullWidth label="Your Text" variant="outlined" />
  );

  // Komponente für das PDF-Widget
  const PdfWidget = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <UploadFileIcon sx={{ fontSize: 60, color: "orange" }} />
    </Box>
  );

  // Komponente für das Video-Widget
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
          {/* Box-Container für den Text und die Icons */}
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
              flexDirection: "row", // Icons horizontal anordnen
              marginLeft: "auto", // Schiebt die Icons nach rechts
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
          {/* Linke Seite */}
          <Grid item xs={12} md={6}>
            <WidgetArea
              onAddWidget={handleAddWidgetLeft}
              selectedWidget={selectedWidgetLeft}
            />
          </Grid>

          {/* Rechte Seite */}
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

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
//         <Grid container spacing={2}>
//           {/* Texteditor Bereich (Links)*/}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{ border: "1px solid #ccc", minHeight: "150px", padding: 1 }}>
//               {/* {selectedWidget === "text" && <TextWidget />}
//               {selectedWidget === "pdf" && <PdfWidget />}
//               {selectedWidget === "video" && <VideoWidget />} */}
//               <TextField fullWidth label="Edit This  Note" id="fullWidth" />
//             </Box>
//           </Grid>
//           {/* Widget Auswahl Bereich (Rechts)- wird nur angezeigt, wenn kein Widget ausgewählt ist*/}
//           <Grid item xs={12} md={6}>
//             {/* Hier können Sie die rechte Seite mit Inhalten füllen */}
//             <Box sx={{ height: "150px", padding: 1, border: "1px solid #ccc" }}>
//             {!selectedWidget && (
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column", // Stapelt die Elemente vertikal
//                   alignItems: "center", // Zentriert die Elemente horizontal
//                   justifyContent: "center", // Zentriert die Elemente vertikal, wenn es zusätzlichen Platz gibt
//                   //marginTop: 2,
//                 }}
//               >
//                 <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>
//                   Choose a widget
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "row", // Ordnet die Icons horizontal an
//                     alignItems: "center", // Zentriert die Icons vertikal
//                     justifyContent: "center", // Zentriert die Icons horizontal
//                   }}
//                 >
//                   <IconButton onClick={() => handleAddWidget("text")}
//                   sx={{
//                     color: "white",
//                     bgcolor: "blue", // Blauer Hintergrund für das Text-Widget
//                     "&:hover": {
//                       bgcolor: "darkblue", // Dunkleres Blau beim Hover
//                     },
//                     borderRadius: "50%",
//                   }}
//                 >
//                     <TextFieldsIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleAddWidget("pdf")}
//                   sx={{
//                     color: "white",
//                     bgcolor: "orange", // Orangener Hintergrund für das PDF-Widget
//                     "&:hover": {
//                       bgcolor: "darkorange", // Dunkleres Orange beim Hover
//                     },
//                     borderRadius: "50%",
//                     marginLeft: 1, // Fügt Abstand zwischen den Icons hinzu
//                   }}
//                   >
//                     <PictureAsPdfIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleAddWidget("video")}
//                   sx={{
//                     color: "white",
//                     bgcolor: "red", // Roter Hintergrund für das Video-Widget
//                     "&:hover": {
//                       bgcolor: "darkred", // Dunkleres Rot beim Hover
//                     },
//                     borderRadius: "50%",
//                     marginLeft: 1, // Fügt Abstand zwischen den Icons hinzu
//                   }}
//                   >
//                     <PlayCircleFilledIcon />
//                   </IconButton>
//                 </Box>
//               </Box>
//             )}
//             {/* Anzeigen des ausgewählten Widgets */}
//               {selectedWidget === "text" && <TextWidget />}
//               {selectedWidget === "pdf" && <PdfWidget />}
//               {selectedWidget === "video" && <VideoWidget />}

//               {/* Hier können Sie die Widgets hinzufügen */}
//             </Box>
//           </Grid>

//         </Grid>
//       </Paper>
//     </Box>
//   );
// }

// export default EditNote;
