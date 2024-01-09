const db = require("../models");
const Card = db.card;

export const getAllCards = async (req, res) => {
  try {
    let foundCards = await Card.find();
    if (foundCards) {
      return res.status(200).send({ message: `Cards found!`, cards: foundCards });
    }
    return res.status(200).send({ message: `Cards not found!` });
  } catch (err) {
    res
      .status(500)
      .send({ message: `Error gettign Cards from your MongoDB database` });
    return;
  }
};
