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
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ChooseLayout from './chooseLayout';


function EditNote() {
  const handleAddSection = () => {
    console.log("Add Section Clicked");
  };

  const [selectedLayout, setSelectedLayout] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);

  const renderContentBasedOnLayout = () => {
    switch (selectedLayout) {
      case 'layout1':
        return <TextField fullWidth label="Ein Bereich" />;
      case 'layout2':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField fullWidth label="Bereich 1" />
            <TextField fullWidth label="Bereich 2" />
          </Box>
        );
      case 'layout3':
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField fullWidth label="Bereich 1" />
            <TextField fullWidth label="Bereich 2" />
            <TextField fullWidth label="Bereich 3" />
          </Box>
        );
      default:
        return <Typography>Wählen Sie ein Layout</Typography>;
    }
  };

  // const [selectedWidgetLeft, setSelectedWidgetLeft] = useState(null);
  // const [selectedWidgetRight, setSelectedWidgetRight] = useState(null);

  // const handleAddWidgetLeft = (widgetType) => {
  //   setSelectedWidgetLeft(widgetType);
  // };

  // const handleAddWidgetRight = (widgetType) => {
  //   setSelectedWidgetRight(widgetType);
  // };
  const handleAddWidget = (widgetType) => {
    setSelectedWidget(widgetType);
  };

  // Komponente für das Text-Widget
  const TextWidget = () => (
    <TextField fullWidth label="Your Text" variant="outlined" />
  );

  // Komponente für das PDF-Widget
  const PdfWidget = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <UploadFileIcon sx={{ fontSize: 60, color: 'orange' }} />
    </Box>
  );

  // Komponente für das Video-Widget
  const VideoWidget = () => (
    <TextField fullWidth label="YouTube Video Link" variant="outlined" />
  );


  // const WidgetArea = ({ onAddWidget, selectedWidget }) => (
  //   <Box sx={{ height: "150px", padding: 1, border: "1px solid #ccc" }}>
  //     {!selectedWidget && (
  //       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
  //         <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>Choose a widget</Typography>
  //         <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
  //           <IconButton onClick={() => onAddWidget("text")} sx={{ color: "white", bgcolor: "blue", "&:hover": { bgcolor: "darkblue" }, borderRadius: "50%" }}>
  //             <TextFieldsIcon />
  //           </IconButton>
  //           <IconButton onClick={() => onAddWidget("pdf")} sx={{ color: "white", bgcolor: "orange", "&:hover": { bgcolor: "darkorange" }, borderRadius: "50%", marginLeft: 1 }}>
  //             <PictureAsPdfIcon />
  //           </IconButton>
  //           <IconButton onClick={() => onAddWidget("video")} sx={{ color: "white", bgcolor: "red", "&:hover": { bgcolor: "darkred" }, borderRadius: "50%", marginLeft: 1 }}>
  //             <PlayCircleFilledIcon />
  //           </IconButton>
  //         </Box>
  //       </Box>
  //     )}
  //     {selectedWidget === "text" && <TextWidget />}
  //     {selectedWidget === "pdf" && <PdfWidget />}
  //     {selectedWidget === "video" && <VideoWidget />}
  //   </Box>
  // );


  const renderWidgets = () => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography variant="subtitle2" sx={{ marginBottom: 2 }}>Choose a widget</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <IconButton onClick={() => handleAddWidget("text")} sx={{ color: "white", bgcolor: "blue", "&:hover": { bgcolor: "darkblue" }, borderRadius: "50%" }}>
          <TextFieldsIcon />
        </IconButton>
        <IconButton onClick={() => handleAddWidget("pdf")} sx={{ color: "white", bgcolor: "orange", "&:hover": { bgcolor: "darkorange" }, borderRadius: "50%", marginLeft: 1 }}>
          <PictureAsPdfIcon />
        </IconButton>
        <IconButton onClick={() => handleAddWidget("video")} sx={{ color: "white", bgcolor: "red", "&:hover": { bgcolor: "darkred" }, borderRadius: "50%", marginLeft: 1 }}>
          <PlayCircleFilledIcon />
        </IconButton>
      </Box>
      {selectedWidget === "text" && <TextWidget />}
      {selectedWidget === "pdf" && <PdfWidget />}
      {selectedWidget === "video" && <VideoWidget />}
    </Box>
  );


//   return (
//     <Box sx={{ padding: 2 }}>
//       <ChooseLayout onLayoutSelect={setSelectedLayout} />
//       <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
//         <Grid container spacing={2}>
//           {/* Linke Seite */}
//           <Grid item xs={12} md={6}>
//             <WidgetArea onAddWidget={handleAddWidgetLeft} selectedWidget={selectedWidgetLeft} />
//           </Grid>

//           {/* Rechte Seite */}
//           <Grid item xs={12} md={6}>
//             <WidgetArea onAddWidget={handleAddWidgetRight} selectedWidget={selectedWidgetRight} />
//             {renderContentBasedOnLayout()}
//           </Grid>
//         </Grid>
//       </Paper>
//     </Box>
    
//   );
  
// }

return (
  <Box sx={{ padding: 2 }}>
    {!selectedLayout && <ChooseLayout onLayoutSelect={setSelectedLayout} />}
    {selectedLayout && (
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          {Array.from({ length: parseInt(selectedLayout[selectedLayout.length - 1]) }, (_, i) => (
            <Grid key={i} item xs={12} md={4}>
              {renderWidgets()}
            </Grid>
          ))}
        </Grid>
      </Paper>
    )}
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
