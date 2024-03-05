import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
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
import FormControlLabel from "@mui/material/FormControlLabel";
import EditNote from "./Notes/editNote.jsx";
import { getCourses, createNotes } from "../utils/api.js";
import { addNoteToDrafts } from "../utils/api.js";

function AddNote() {
  // Retrieve existing courses from the backend
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
  const [showEditNote, setShowEditNote] = useState(false);

  const handleLayoutSelect = (layout) => {
    console.log("Ausgewähltes Layout:", layout); // "Ausgewähltes Layout: layout1"
    setSelectedLayout(layout);
    setNewSection(false); // Hides Layout Options
    setShowEditNote(true); // Shows new Interface
  };

  const [noteTitle, setNoteTitle] = useState(""); // State variable for the title of the note
  const [titleError, setTitleError] = useState(""); // Status variable for the error message
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // States for the checkboxes
  const [addToDrafts, setAddToDrafts] = useState(false);
  const [createNewCourse, setCreateNewCourse] = useState(false);

  const handleAddToDraftsChange = (event) => {
    setAddToDrafts(event.target.checked);
    if (event.target.checked) {
      // Logic for adding to drafts
      {
        /*...*/
      }
    }
  };
  const handleCreateNewCourseChange = (event) => {
    setCreateNewCourse(event.target.checked);
    // More logic for "Create New Course"
    {
      /*...*/
    }
  };

  const handleSaveNote = async () => {
    // Title validation
    if (!noteTitle.trim()) {
      setTitleError("You forgot to add a title to your note!");
      return;
    }
    // Reset the error message and open the dialogue if the title exists
    setTitleError("");

    var response = await createNotes({
      title: noteTitle,
      user_id: JSON.parse(sessionStorage.getItem("elas-user")).id,
      sections: [],
      widgets: [],
    });

    if (addToDrafts) {
      console.log(response);
      try {
        const result = await addNoteToDrafts(
          JSON.parse(sessionStorage.getItem("elas-user")).id,
          response.note._id
        );
        console.log("Note saved to drafts:", result);
      } catch (error) {
        console.error("Error saving note to drafts:", error);
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
          error={!!titleError}
          helperText={titleError}
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
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginRight: 2,
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
              onClick={handleSaveNote}
              variant="contained"
              sx={{
                bgcolor: "#ED7D31",
                color: "white",
                "&:hover": {
                  bgcolor: "darken(#ED7D31, 0.2)", // Darker color while hovering
                },
                alignSelf: "flex-end",
                textTransform: "none",
              }}
              endIcon={<CheckIcon />}
            >
              ASSIGN AND SAVE
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      {newSection && (
        // Show ChooseLayout component
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
    </Container>
  );
}

export default AddNote;
