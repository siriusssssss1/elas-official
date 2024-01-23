import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { LayoutSelector } from "./Notes/chooseLayout.jsx";
//import { useNavigate } from "react-router-dom";

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
  };
  const handleLayoutSelect = (layout) => {
    console.log("Ausgewähltes Layout:", layout);
    setShowLayoutOptions(false);
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
        >
          Save
        </Button>
      </Box>
      
      {newSection && (
        <Button
          variant="contained"
          color="primary"
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
          //onClick={() => setShowLayoutOptions((prevState) => !prevState)} //State wird umgekehrt
          //onClick={handleAddSectionClick}
          //onClick= {() => navigate ("Projects/NoteBot/Notes/Sectiom")}
          onClick={handleLayoutOptionsClick}
        >
          {" "}
          hide{" "}
        </Button>

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
              //onClick={() => setNewSection((prevState) => !prevState)}
              //onClick={handleLayoutOptionsClick}
              //onClick= {() => navigate ("Projects/NoteBot/Notes/Sectiom")}
              onClick={handleLayoutOptionsClick}
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
      {showLayoutOptions && <LayoutSelector onLayoutSelect={handleLayoutSelect} />}
      {/* {showLayoutOptions && <LayoutSelector />}{" "}
      Zeige Layout-Optionen, wenn showLayoutOptions wahr ist */}
    </Container>
  );
}

export default AddNote;
