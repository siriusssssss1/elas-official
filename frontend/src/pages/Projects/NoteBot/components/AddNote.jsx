import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Autocomplete,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ChooseLayout from "./Notes/chooseLayout.jsx";
import { LayoutSelector } from "./Notes/chooseLayout.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";

//import { createCourse } from "../../../../../../backend/7-notebot/src/controllers/courseController.js";
//import { useNavigate } from "react-router-dom";

const top100Films = [
  // Courses list aus backend
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

function AddNote() {
  const [newSection, setNewSection] = useState(false);
  const [showLayoutOptions, setShowLayoutOptions] = useState(false);

  // const handleAddSectionClick = () => {
  //   setNewSection((prevState) => !prevState);
  //   setShowLayoutOptions(false); // Hide layout options when adding a new section
  // };
  const handleLayoutOptionsClick = () => {
    setShowLayoutOptions(true);
  };
  const handleHideClick = () => {
    setShowLayoutOptions(false);
    setNewSection(false);
  };
  const handleHideAndReset = () => {
    //hiermit kann man wieder zwischen den modi switchen ()
    setShowLayoutOptions(false); // Versteckt die Layout-Optionen
    setNewSection(false); // Setzt newSection zurück auf false
  };

  const handleLayoutSelect = (layout) => {
    console.log("Ausgewähltes Layout:", layout);
    setShowLayoutOptions(false);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
  };

  // Zustände für die Checkboxen
  const [addToDrafts, setAddToDrafts] = useState(false);
  const [createNewCourse, setCreateNewCourse] = useState(false);

  const handleAddToDraftsChange = (event) => {
    setAddToDrafts(event.target.checked);
    if (event.target.checked) {
      // Logik für das Hinzufügen zu Entwürfen
      // Zum Beispiel: handleClose oder eine andere Aktion
    }
  };
  const handleCreateNewCourseChange = (event) => {
    setCreateNewCourse(event.target.checked);
    // Weitere Logik für "Create New Course"
  };

  //const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ position: "relative", bgcolor: "#FFFFFF" }}>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #D9D9D9",
          pb: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Add Note Title"
          sx={{
            width: "224px",
            height: "60px",
            bgcolor: "#FEFEFE",
            border: "2px solid #C2C2C2",
            borderRadius: "8px",
            "& .MuiInputBase-input": {
              fontFamily: "Arial",
              fontSize: "18px",
              color: "#767676",
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: "124px",
            height: "40px",
            bgcolor: "#C2C2C2",
            borderRadius: "4px",
            "& .MuiButton-startIcon": {
              color: "#767676",
            },
            "& .MuiButton-label": {
              fontFamily: "Arial",
              fontSize: "18px",
              lineHeight: "21px",
              textTransform: "uppercase",
            },
          }}
          startIcon={<SaveIcon />}
          onClick={handleClickOpen}
        >
          Save
        </Button>
      </Box>
      <Dialog onClose={handleClose} open={openDialog} sx={{ height: "800px" }}>
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add note to course
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Courses List" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Platz zwischen Checkboxen und Button
              width: "100%", // Volle Breite des Dialogs nutzen
              paddingTop: 2, // Optionaler Abstand nach oben
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // optional, für linksbündige Checkboxen
                marginRight: 2, // optional, Abstand zum "Assign and Save" Button
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={addToDrafts}
                    onChange={handleAddToDraftsChange}
                    name="addToDrafts"
                    color="primary"
                  />
                }
                label="Or add to drafts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={createNewCourse}
                    onChange={handleCreateNewCourseChange}
                    name="createNewCourse"
                    color="primary"
                  />
                }
                label="Or create new course"
              />
            </Box>
            <Button
              //onClick={createCourse}
              variant="contained"
              sx={{
                bgcolor: "#ED7D31", // Farbe des Buttons
                color: "white", // Textfarbe
                "&:hover": {
                  bgcolor: "darken(#ED7D31, 0.2)", // Dunklere Farbe beim Hover
                },
                alignSelf: "flex-end", // Button nach unten ausrichten
                textTransform: "none", // Standardmäßige Großbuchstaben entfernen
                // Optional können Sie hier die Schriftart, Größe usw. anpassen
              }}
              endIcon={<CheckIcon />}
            >
              ASSIGN AND SAVE
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {newSection && (
        // Anstatt eines "Hide"-Buttons, zeigen Sie die ChooseLayout-Komponente
        <ChooseLayout onLayoutSelect={handleLayoutSelect} />
      )}
      {!newSection && (
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            height: "239px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px dashed #767676",
            borderRadius: "10px",
            marginY: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <AddIcon
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    color: "#FFFFFF",
                    fontSize: "36px",
                    lineHeight: "42px",
                  }}
                />
              }
              sx={{
                bgcolor: "#ED7D31",
                borderRadius: "50%",
                width: "60px",
                height: "60px",

                "& .MuiButton-startIcon": {
                  margin: "auto",
                  display: "block",
                  color: "#FFFFFF",
                },
              }}
              onClick={() => setNewSection((prevState) => !prevState)}
              //onClick={handleLayoutOptionsClick}
              //onClick= {() => navigate ("Projects/NoteBot/Notes/Sectiom")}
              //onClick={handleLayoutOptionsClick}
            />
            <span
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                fontFamily: "Arial",
                fontSize: "18px",
                lineHeight: "21px",
                color: "#555555",
                textTransform: "uppercase",
              }}
            >
              Add a Section
            </span>
          </div>
        </Paper>
      )}
      {showLayoutOptions && (
        <LayoutSelector onLayoutSelect={handleLayoutSelect} />
      )}
      {/* {showLayoutOptions && <LayoutSelector />}{" "}
      Zeige Layout-Optionen, wenn showLayoutOptions wahr ist */}
    </Container>
  );
}

export default AddNote;
