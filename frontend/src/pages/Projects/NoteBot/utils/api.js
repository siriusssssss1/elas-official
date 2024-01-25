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
    const response = await Backend.get(`notebot/notes/search/${keyword}/`);
    console.log(response.data); // Message from the server
    return response.data;
  } catch (err) {
    console.log(err);
    return { message: 'Server not connected' };
  }
};


export const createNote = async (
  title,
  course,
  user,
) => { 
  const response = await fetch(`notebot/notes/new`, {
    method: "POST",
    headers: { "Content-type": "application/json"},
    body: JSON.stringify({
      title :title,
      course_id: course,
      user_id: user,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    let error = new Error("Http status code" + response.status);
    error.data = data;
    error.status = response.status;
    throw error;
  }

  return data;
};