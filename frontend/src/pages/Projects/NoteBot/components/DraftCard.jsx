import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  DialogContentText } from "@mui/material";

  
export default function DraftCard({ card, handleDeleteNote}) { 

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = () => {
    handleClose(); 
    handleDeleteNote(card.id); // Calls up the delete function with the ID of the note
  };
  return (
    <Card
      style={{
        width: "250px",
        position: "relative",
        height: "200px",
        backgroundColor: "#d9d9d9",
        margin: "8px"
      }}
      key={card.id}
    >
      <CardContent
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          color="textSecondary"
          variant="h6"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          {card.title}
        </Typography>

        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          style={{ position: "absolute", bottom: "8px", left: "8px" }}
        >
        </Stack>
      </CardContent>
      <CardContent style={{ position: "absolute", top: 0, right: 0 }}>
      </CardContent>
      <CardContent
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: "8px",
        }}
      >
        <DeleteIcon
          style={{ color: "#A5A5A5" }}
          onClick = {handleClickOpen}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>   
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this note?       
            </DialogContentText>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  color: "white",
                  bgcolor: "gray"
                }}
              >
                Disagree
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                sx={{
                  color: "white",
                  bgcolor: "red",
                }}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}