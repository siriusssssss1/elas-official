import { CardMedia, TextField,Box } from "@mui/material";
import { useState } from "react";
import ReactPlayer from "react-player";

export const Video = ({ value, onChange }) => {

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (

    <Box >
      <TextField
        type="url"
        label="Video URL"
        id="outlined-required"
        value={value}
        name="url"
        onChange={handleChange}
        fullWidth
        sx={{
          background: "#FEFEFE",
          borderRadius: 2,
          marginY:1

        }}
      />

      {!!value && value.length !== 0 && (
        <ReactPlayer
          width={"100%"}
          // height={"100%"}
          url={value}
          playing={true}
          muted={true}
          controls={true}
        />
      )}
   </Box>
  );
};
