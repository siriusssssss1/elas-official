import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Typography, 
        Button, 
        Dialog, 
        DialogTitle, 
        DialogActions, 
        DialogContent, 
        DialogContentText } from "@mui/material";
//import handleDeleteNote2 from "./MyNotes";
//import handleToggleFavorite from "./MyNotes";


export default function NoteCard({ card, handleDeleteNote, handleToggleFavorite }) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Rating
            name={`rating-${card.id}`}
            value={card.rating}
            precision={0.5}
            readOnly
          />
        </Stack>
      </CardContent>
      <CardContent style={{ position: "absolute", top: 0, right: 0 }}>
        {card.isFavorite ? (
          <FavoriteIcon color="error" onClick={handleToggleFavorite}/>
        ) : (
          <FavoriteBorderIcon color="error" onClick={handleToggleFavorite}/>
        )}
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
        <DialogTitle id="alert-dialog-title">
          {"Delete this Note?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this note?
          </DialogContentText>
          <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
      </CardContent>
    </Card>
  );
}

