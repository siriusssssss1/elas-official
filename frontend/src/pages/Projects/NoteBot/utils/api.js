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
    // TODO: Backend Team implement fucntion to get cards
    
    // Fake data until fixed
    const response = await Backend.get(`/notebot/cards`);

    const {
      data: { message, cards },
    } = response;

    return { message, cards };
  } catch (err) {
    console.log(err);
    return {
      message: "Server not connected",
      cards: undefined
    };
  }
};