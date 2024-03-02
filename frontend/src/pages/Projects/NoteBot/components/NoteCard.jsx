import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

export default function noteCard({
  card,
  isFavorite,
  handleDeleteNote,
  handleToggleFavorite,
  handleRatingNote,
}) {
  const [open, setOpen] = React.useState(false);

  // open/close dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = () => {
    handleClose();
    handleDeleteNote(card.id);
  };

  const handleFavoriteClick = () => {
    console.log(`Favorite clicked for note id: ${card.id}`);
    // Assuming handleToggleFavorite requires the id of the note to toggle its favorite status
    handleToggleFavorite(card.id);
  };

  const handleRatingChange = (event, rating) => {
    handleRatingNote(card.id, rating);
  };

  return (
    <Card
      style={{
        width: "250px",
        position: "relative",
        height: "200px",
        backgroundColor: "#d9d9d9",
        margin: "8px",
      }}
      key={card.id} // efficiently update the list of cards
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
            name="half-rating"
            defaultValue={
              card.ratings?.find(
                (rating) =>
                  // Change to variable userId
                  rating.userId === JSON.parse(sessionStorage.getItem("elas-user")).id
              )?.rating ?? 0
            }
            precision={0.5}
            onChange={handleRatingChange}
          />
        </Stack>
      </CardContent>
      <CardContent style={{ position: "absolute", top: 0, right: 0 }}>
        {isFavorite ? (
          <FavoriteIcon color="error" onClick={handleFavoriteClick} />
        ) : (
          <FavoriteBorderIcon color="error" onClick={handleFavoriteClick} />
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
        <DeleteIcon style={{ color: "#A5A5A5" }} onClick={handleClickOpen} />
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
                  bgcolor: "gray",
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
