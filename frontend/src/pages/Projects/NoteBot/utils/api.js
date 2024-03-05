import { Backend } from "../../../../utils/apiConfig";

// Function to retrieve user information by user ID
export const getUserInfo = async (userId) => {
  try {
    const response = await Backend.get(`/notebot/users/${userId}`);
    const {
      data: { message, user },
    } = response;

    return { message, user };
  } catch (err) {
    console.log(err);
    // Return default values in case of an error
    return {
      message: "Server not connected",
      user: {
        uid: "",
        name: "",
        username: "",
      },
    };
  }
};

// Function to get cards by user ID
export const getCards = async (userId) => {
  try {
    // Fetching notes/cards data from the server
    const responseNr2 = await Backend.get(`/notebot/notes/users/${userId}`);
    console.log(responseNr2.data)
   
     // Extracting relevant data (cards) and returning it
    return {cards: responseNr2.data.notes[0].notes}; 
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

// Function to get drafts by user ID
export const getDrafts = async (userId) => {
  try {
    // Fetching drafts data from the server
    const responseNr2 = await Backend.get(`/notebot/drafts/users/${userId}/`); 
    console.log(responseNr2.data)
    // Extracting relevant data (drafts) and returning it
    return {cards: responseNr2.data.notes}; 
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

// Function to get favorite notes
export const getFavNotes = async () => {
  try {
    // Fetching favorite notes data from the server
    const responseNr2 = await Backend.get(`/notebot/notes/users/9107bb63-2494-4720-80de-db464cf03255/favorite`); // wenn man hier ${userId} eingibt, funktioniert es noch nicht
    console.log(responseNr2.data)
    // Extracting favorite notes and returning them
    return {cards: responseNr2.data.notes}; 
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

// Function to toggle a note as a favorite
export const toggleFavNote = async (noteId) => {
  try {
    // Sending a request to toggle the favorite status of a note
    const response = await Backend.post(`/notebot/favorites/notes/${noteId}`);
    console.log(response.data); // Message from the server
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};


// Function to delete a note from the server
export const deleteNoteFromServer = async (noteId, userid) => {
  try {
    // Sending a request to delete a note with specified noteId and user header
    const response = await Backend.delete(`/notebot/notes/${noteId}`, {
      headers: {
        user_id: userid
      }
    });
    console.log(response.data); 
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};

// Function to set the rating of a note on the server
export const setRatingOnServer = async (userId, noteId, rating) => {
  try {
    // Sending a request to update the rating of a note
    // Assuming Backend is an Axios instance
    const response = await Backend.post('/notebot/notes/update_rating', {
      user_id: userId,
      noteId,
      rating
    });
    console.log(response.data); 
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};

// Function to search for notes by keyword and user ID
export const getNotesByCourseAndNoteTitle = async (keyword, userId) => {
  try {
    // Sending a request to search for notes with specified keyword and user header
    const response = await Backend.get(`notebot/notes/search/${keyword}/`, {
      headers: {
        'user_id': userId,
      },
    });
    console.log(response.data); 
    return {cards: response.data}; 
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};


export const createCourse = async (title, user_id) => { 
  try {
    // Sending a request to create a new course with specified title and user ID
    const response = await fetch(`notebot/courses/new`, { 
      method: "POST",  
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        user_id: user_id,
      }),
    });

    const data = await response.json();

    // Handling error cases
    if (!response.ok) {
      throw new Error(`HTTP status code ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Server not connected'); // Re-throw the error for handling in the calling function
  }
};

export const getCourses = async () => {
  try {
    const response = await Backend.get(`notebot/courses/test`);
    console.log(response.data); 
    // Extracting course titles and returning them
    return response.data.courses;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};

export const createNotes = async (noteData) => {
  try {
  // Sending a request to create new notes with specified data
   const response = await Backend.post(`notebot/notes/new`, noteData); 
   console.log(response.data)
   
  return response.data; 
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

export const addNoteToDrafts = async (userId, noteId) => {
  try {
    console.log(noteId);
    console.log(userId);

    // Sending a request to add a note to drafts with specified user ID and note ID
   const response = await Backend.patch(`notebot/drafts/users/notes/save`, {
    "user_id": userId,
    "note_id": noteId
   }); 
   console.log(response.data)
   
  return {cards: response.data.notes}; 
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};




