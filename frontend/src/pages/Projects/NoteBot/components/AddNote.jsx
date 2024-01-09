import React from 'react';
import { Container, TextField, Button, Box, Paper, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';

function AddNote() {
  return (
    <Container maxWidth="lg" sx={{ position: 'relative', bgcolor: '#FFFFFF' }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #D9D9D9',
          pb: 2,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Add Note Title"
          sx={{
            width: '224px',
            height: '60px',
            bgcolor: '#FEFEFE',
            border: '2px solid #C2C2C2',
            borderRadius: '8px',
            '& .MuiInputBase-input': {
              fontFamily: 'Arial',
              fontSize: '18px',
              color: '#767676',
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: '124px',
            height: '40px',
            bgcolor: '#C2C2C2',
            borderRadius: '4px',
            '& .MuiButton-startIcon': {
              color: '#767676', // Adjust icon color here if needed
            },
            '& .MuiButton-label': {
              fontFamily: 'Arial',
              fontSize: '18px',
              lineHeight: '21px',
              color: '#767676',
              textTransform: 'uppercase',
            },
          }}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Box>
      <Paper
        variant="outlined"
        sx={{
          width: '1246px',
          height: '239px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px dashed #767676',
          borderRadius: '10px',
          marginY: '30px', // Adjust as per the design's vertical spacing
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            bgcolor: '#ED7D31',
            '& .MuiButton-startIcon': {
              color: '#FFFFFF', // Adjust icon color here if needed
            },
            '& .MuiButton-label': {
              fontFamily: 'Arial',
              fontSize: '18px',
              lineHeight: '21px',
              color: '#555555',
              textTransform: 'uppercase',
            },
          }}
        >
          Add a Section
        </Button>
      </Paper>
    </Container>
  );
}

export default AddNote;
