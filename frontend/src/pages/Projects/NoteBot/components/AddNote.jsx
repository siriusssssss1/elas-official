import React, { useState, useEffect } from "react";
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
//import { LayoutSelector } from "./Notes/chooseLayout.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import EditNote from "./Notes/editNote.jsx";

//import { createCourse } from "../../../../../../backend/7-notebot/src/controllers/courseController.js";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../utils/api.js";
import { addNoteToDrafts } from "../utils/api.js";
import { createNotes } from "../utils/api.js";

function AddNote() {
  useEffect(() => {
    getCourses().then((courses) => {
      // Key "message" indicates faulty course fetch
      if (courses && "message" in courses) {
        // Error in api call
        setDropDownOptions([]);
      } else {
        // Parse course names
        const courseTitles = courses.map((course) => course.title);
        setDropDownOptions(courseTitles);
      }
    });
  }, []);

  const [dropDownOptions, setDropDownOptions] = useState([]);

  const [newSection, setNewSection] = useState(false);
  //const [showLayoutOptions, setShowLayoutOptions] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState(null);
  //const [showTextField, setShowTextField] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [dynamicNoteData, setDynamicNoteData] = useState({
    title: "Sozialpsychologie Draft",
    user_id: "a19d4fd7-2052-42e4-8ab2-56db09944363",
    sections: [],
    widgets: [],
  });

  // const handleAddSectionClick = () => {
  //   setNewSection((prevState) => !prevState);
  //   setShowLayoutOptions(false); // Hide layout options when adding a new section
  // };
  // const handleLayoutOptionsClick = () => {
  //   setShowLayoutOptions(true);
  // };
  // const handleHideClick = () => {
  //   setShowLayoutOptions(false);
  //   setNewSection(false);
  // };
  // const handleHideAndReset = () => {
  //   //hiermit kann man wieder zwischen den modi switchen ()
  //   setShowLayoutOptions(false); // Versteckt die Layout-Optionen
  //   setNewSection(false); // Setzt newSection zurück auf false
  // };

  const navigate = useNavigate();

  const handleLayoutSelect = (layout) => {
    console.log("Ausgewähltes Layout:", layout);
    setSelectedLayout(layout);
    setNewSection(false); // Versteckt die Layout-Optionen
    setShowEditNote(true); // Zeigt das neue Interface an
  };

  const [noteTitle, setNoteTitle] = useState(""); // Zustandsvariable für den Titel der Notiz
  const [titleError, setTitleError] = useState(""); // Zustandsvariable für die Fehlermeldung
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

  // const handleSaveButtonClick = async () => {
  //   try {
  //     // Call createNotes function
  //     const createdNote = await createNotes(dynamicNoteData);

  //     // Handle success, e.g., show a success message
  //     console.log('Note created successfully:', createdNote);
  //   } catch (error) {
  //     // Handle errors, e.g., show an error message
  //     console.error('Error creating note:', error);
  //   }
  // };
  const handleSaveButtonClick = () => {
    // Titelvalidierung
    if (!noteTitle.trim()) {
      setTitleError("You forgot to add a title to your note!");
      return; // Beenden, wenn kein Titel vorhanden ist
    }

    // Zurücksetzen der Fehlermeldung und Öffnen des Dialogs, wenn der Titel vorhanden ist
    setTitleError("");
    handleClickOpen();
  };

  // const handleSaveNote = async () => {
  //   if (addToDrafts) {
  //     try {
  //       const response = await fetch('api/notebot/drafts/users/notes/save', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Fügen Sie hier weitere Header hinzu, wie z.B. Authorization für Authentifizierung, falls benötigt
  //         },
  //         body: JSON.stringify(noteData),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Failed to save the note to drafts: ${response.statusText}`);
  //       }

  //       const responseData = await response.json();
  //       console.log('Note saved to drafts:', responseData);
  //       // Weiterer Code nach erfolgreichem Speichern, z.B. Benutzerfeedback oder Navigation
  //     } catch (error) {
  //       console.error('Error saving note to drafts:', error);
  //       // Fehlerbehandlung, z.B. Anzeigen einer Fehlermeldung
  //     }

  //     navigate('../Drafts'); //right path
  // }
  //};

  const handleSaveNote = async () => {
    if (!noteTitle.trim()) {
      // Setzen der Fehlermeldung, wenn kein Titel vorhanden ist
      setTitleError("You forgot to add a title to your note!");
      return; // Beenden der Funktion, um das Speichern zu verhindern
    }

    // Zurücksetzen der Fehlermeldung, wenn der Titel vorhanden ist
    setTitleError("");

    if (addToDrafts) {
      try {
        const result = await addNoteToDrafts(); // Assuming noteData is available
        console.log("Note saved to drafts:", result);

        navigate("/Drafts"); //get right path
      } catch (error) {
        console.error("Error saving note to drafts:", error);
        // Fehlerbehandlung, z.B. Anzeigen einer Fehlermeldung
      }
    }
  };

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
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          error={!!titleError} // Zeigt einen Fehlerstatus an, wenn titleError einen Wert hat
          helperText={titleError} // Zeigt die Fehlermeldung als Hilfetext an
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
          //onClick={handleSaveButtonClick}
          //onClick={handleClickOpen}
          onClick={handleSaveButtonClick}
        >
          Save
        </Button>
      </Box>

      {/* Button zum Umschalten der Layout-Optionen */}
      {/* <Button onClick={() => setNewSection(prevState => !prevState)}>
        {newSection ? "Layout ausblenden" : "Layout wählen"}
      </Button>

      {newSection && (
        <ChooseLayout onLayoutSelect={handleLayoutSelect} />
      )} */}

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
            options={dropDownOptions}
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
              onClick={handleSaveNote}
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

      {showEditNote && <EditNote />}

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
      {/* {showLayoutOptions && (
        <LayoutSelector onLayoutSelect={handleLayoutSelect} />
      )}
      {/* {showLayoutOptions && <LayoutSelector />}{" "}
      Zeige Layout-Optionen, wenn showLayoutOptions wahr ist */}
    </Container>
  );
}

export default AddNote;
