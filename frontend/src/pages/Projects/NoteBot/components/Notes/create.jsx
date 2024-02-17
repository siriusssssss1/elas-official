import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Fab,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import { PageHeader } from "../../../components/PageHeader";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { useState } from "react";

import { useAuth } from "../../../contexts/AuthProvider";
import { AddCourseDialog } from "./components/AddCourseDialog.jsx";
import { useToggle } from "../../../app/hooks/useToggle";
import { Section } from "./Section";
import { createNote, getCourses } from "./api";
import { useNavigate } from "react-router-dom";
import { useNoteWidgets } from "../hooks/useNoteWidgets";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default createNote = async () => {
  const {
    sections,
    widgets,
    // onSectionChange,
    // onWidgetSelect,
    // onWidgetUpdate,
    // hasWidgets,
    // addSection,
    // onDelete,
    // onAddAfter,
    // onDuplicate,
  } = useNoteWidgets();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const { token, user, saveUser, logout, isAuthorized } = useAuth();

  const [title, setTitle] = React.useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // const toggleChat = () => {
  //   setOpen(!open);
  // };

  const {
    isActive: isAddCourseActive,
    open: openAddCourse,
    close: closeAddCourse,
  } = useToggle();

  const fetchCourses = React.useCallback(async () => {
    try {
      const fetchedCourses = await getCourses(token, user);

      const courses = fetchedCourses.courses.map((course) => ({
        id: course._id,
        ...course,
      }));

      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  }, [token, user]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onSubmit = async (data = {}) => {
    //uses createNote-function, to create a note and navigates to the new note
    if (!title) {
      alert("Title is empty");
      return;
    }

    const noteData = {
      title: title,
      courseId: data.courseId || course,
      //user,
      sections: sections,
      widgets: widgets,
      isDrafts: true,
    };

    try {
      // sends POST-request to the Backend
      const res = await createNote(token, user, noteData);

      navigate(`/drafts`);
    } catch (error) {
      console.error("Fehler beim Speichern der Notiz", error);
    }
  };

  const res = await createNote(
    token,
    title,
    data.courseId || course,
    user,
    sections,
    widgets
  );

  console.log("RES", res);
  navigate(`/notes/${res.note._id}`);
};

// const [selectedLocation, setSelectedLocation] = useState('course'); // 'course' oder 'drafts'
// const [saveDialogOpen, setSaveDialogOpen] = useState(false);
// const openSaveDialog = () => {
//   setSaveDialogOpen(true);
// };

// const closeSaveDialog = () => {
//   setSaveDialogOpen(false);
// };

// const handleSave = async () => {
//   if (selectedLocation === 'course') {
//     // Speichern in Kurs
//     try {
//       // Fügen Sie hier den Code für das Speichern in Kursen hinzu
//       const response = await saveNoteInCourse(courseId, noteData);
//     } catch (error) {
//       console.error('Error saving note in course:', error);
//       // Hier können Sie geeignete Fehlerbehandlung hinzufügen
//       let errorMessage = 'An error occurred while saving the note. Please try again.';

//     }
//   } else {
//     // Speichern in Entwürfen

//     try {
//       // Fügen Sie hier den Code für das Speichern in Entwürfen hinzu
//       const response = await saveNoteInDrafts(noteData);
//     } catch (error) {
//       console.error('Error saving note in drafts:', error);
//       let errorMessage = 'An error occurred while saving the note. Please try again.';
//     }
//   }

//   // Schließen Sie das Popup-Fenster
//   closeSaveDialog();
// };

return (
  <Container sx={{ flexGrow: 1, padding: 6 }}>
    <PageHeader
      // title={title}
      label={"Add Note Title"}
      onChange={(title) => setTitle(title)}
      isEditable={true}
      sx={{ width: "100%" }}
      variant={"outlined"}
      actions={[
        {
          label: "Download as PDF",
          startIcon: <FileDownloadIcon />,
          onClick: handleDownloadAsPdf,
          disableElevation: true,
        },
        {
          label: "Save",
          startIcon: <SaveIcon />,
          onClick: () => onSubmit(),
          //onClick: openAddCourse,
          disableElevation: true,
          disabled: !hasWidgets,
        },

  
      ]}
    />
    {sections.map(
      (
        section,
        index //Hier wird über eine Liste von sections (Abschnitten) gemappt
      ) => (
        <>
          {index > 0 && <Box sx={{ height: 16, width: "100%" }} />}
          <Section
            key={section.id}
            section={section}
            onChange={onSectionChange}
            onWidgetSelect={onWidgetSelect}
            onWidgetUpdate={onWidgetUpdate}
            widgets={widgets[section.id] || {}}
            viewMode={false}
            onDelete={onDelete}
            onAddAfter={onAddAfter}
            onDuplicate={onDuplicate}
          />
        </>
      )
    )}
    {sections.length > 0 && (
      <Divider
        sx={{
          margin: 4,
        }}
      />
    )}

    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        height: 150,
        borderRadius: "5px",
        border: "1px dashed #000",
        background: "#FFF",
      }}
    >
      <Button
        color="primary"
        onClick={addSection}
        variant="contained"
        sx={{
          borderRadius: "50%",
          width: 70,
          height: 70,
          ":hover": {
            background: "#ed955a",
            color: "#FFFFFF",
          },
        }}
      >
        <AddIcon />
      </Button>
    </Stack>

    <AddCourseDialog
      onClose={closeAddCourse}
      isOpen={isAddCourseActive}
      courses={courses}
      course={course}
      onSave={onSubmit}
      onChange={(course) => {
        setCourse(course);
        fetchCourses();
      }}
    />
  </Container>
);

// const SaveDialog = ({ open, onClose, onSave, selectedLocation, onLocationChange }) => {
//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Save Note</DialogTitle>
//       <DialogContent>
//         <p>Select where you want to save the note:</p>
//         <Select value={selectedLocation} onChange={(e) => onLocationChange(e.target.value)}>
//           <MenuItem value="course">In Course</MenuItem>
//           <MenuItem value="drafts">In Drafts</MenuItem>
//         </Select>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onSave}>Save</Button>
//         <Button onClick={onClose}>Cancel</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
