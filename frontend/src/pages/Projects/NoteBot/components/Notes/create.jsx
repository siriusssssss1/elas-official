import * as React from "react";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { createNote, getCourses } from "./api";
import { useNavigate } from "react-router-dom";
import { useNoteWidgets } from "../hooks/useNoteWidgets";

export default createNote = async () => {
  const {
    sections,
    widgets,
  } = useNoteWidgets();

  const theme = useTheme();

  const { token, user, saveUser, logout, isAuthorized } = useAuth();

  const [title, setTitle] = React.useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

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

    const noteData = {
      title: title,
      courseId: data.courseId || course,
      sections: sections,
      widgets: widgets,
      isDrafts: true,
    };

    try {                                                  // Sends POST-request to the Backend
      const res = await createNote(token, user, noteData);
      navigate(`/drafts`);
    } catch (error) {
      console.error("Fehler beim Speichern der Notiz:", error);
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

return (
  <Container sx={{ flexGrow: 1, padding: 6 }}>
    <PageHeader
      label={"Add Note Title"}
      onChange={(title) => setTitle(title)}
      isEditable={true}
      sx={{ width: "100%" }}
      variant={"outlined"}
      actions={[
        {
          label: "Save",
          startIcon: <SaveIcon />,
          onClick: () => onSubmit(),
          disableElevation: true,
          disabled: !hasWidgets,
        },
      ]}
    />

    {sections.map(
      (
        section,
        index     // A list of sections is mapped here
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


