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

   const responseNr2 = await Backend.get(`/notebot/drafts/users/a19d4fd7-2052-42e4-8ab2-56db09944363`);
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