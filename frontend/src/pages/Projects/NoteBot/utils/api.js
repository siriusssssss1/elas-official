import { Backend } from "../../../../utils/apiConfig";

export const getUserInfo = async (userId) => {
  try {
    const response = await Backend.get(`/notebot/users/${userId}`);
    const {
      data: { message, user },
    } = response;

    return { message, user };
  } catch (err) {
    console.log(err);
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

export const getCards = async () => {
  try {

   const responseNr2 = await Backend.get(`/notebot/notes/all`);
   console.log(responseNr2.data)
   
  return {cards: responseNr2.data.notes}; 
    const { //relevante Daten (message und cards) werden destrukturiert und in den Variablen message und cards gespeichert
      data: { message, courses },
    } = responseNr2;

    return { message, courses };
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

export const getDrafts = async () => {
  try {

   const responseNr2 = await Backend.get(`/notebot/drafts/users/11ececb0-e1b5-4554-a2b5-7a96ce20bbf3/favorite`); // wenn man hier ${userId} eingibt, funktioniert es noch nicht
   console.log(responseNr2.data)
   
  return {cards: responseNr2.data.notes}; 
    const { //relevante Daten (message und cards) werden destrukturiert und in den Variablen message und cards gespeichert
      data: { message, courses },
    } = responseNr2;

    return { message, courses };
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

export const getFavNotes = async () => {
  try {

   const responseNr2 = await Backend.get(`/notebot/notes/users/11ececb0-e1b5-4554-a2b5-7a96ce20bbf3/favorite`); // wenn man hier ${userId} eingibt, funktioniert es noch nicht
   console.log(responseNr2.data)
   
  return {cards: responseNr2.data.notes}; 
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      courses: undefined
    };
  }
};

export const toggleFavNote = async (noteId) => {
  try {
    const response = await Backend.post(`/notebot/notes/${noteId}/favorite`);
    console.log(response.data); // Message from the server
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};



export const deleteNoteFromServer = async (noteId) => {
  try {
    const response = await Backend.delete(`/notebot/notes/${noteId}`);
    console.log(response.data); // Message from the server
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};


export const getNotesByCourseAndNoteTitle = async (keyword) => {
  try {
    const response = await Backend.get(`notebot/notes/search/${keyword}/`, {
      headers: {
        'user_id': "a19d4fd7-2052-42e4-8ab2-56db09944363",
      },
    });
    console.log(response.data); // Message from the server
    return {cards: response.data}; 
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};

//für die Funktion müsst ihr das fortmat von oben nehmen, damit es funktioniert!
export const createCourse = async (title, user_id) => { 
  try {
    const response = await fetch(`notebot/courses/new`, { 
      method: "POST",  
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title: title,
        user_id: user_id,
      }),
    });

    const data = await response.json();

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
    const response = await Backend.get(`notebot/courses/all`);
    console.log(response.data); 
    //const courses = response.data.map(course => course.title); // Extract course titles

    return response.data.courses;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};


//function does not work, does not get the data
export const addNoteToDrafts = async () => {
  try {

   const response = await Backend.patch(`notebot/drafts/users/notes/save`); 
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


