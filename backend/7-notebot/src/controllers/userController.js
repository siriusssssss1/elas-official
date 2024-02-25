const db = require("../models");
const Search = db.search;
const User = db.user;
const HttpError = db.httpError;

/***************** START: GET USER INFO USING A CONTROLLER *****************
 * @documentation
 *
 * @function getUserById
 * The function `getUserById` is an asynchronous function that retrieves
 * a user from a MongoDB database based on their user ID and sends a
 * response with the user information if found, or a message indicating
 * that the user was not found.
 * @param req - The `req` parameter is an object that represents the
 * HTTP request made to the server.  * It contains information such as
 * the request method, headers, URL, and parameters.
 * @param res - The `res` parameter is the response object that is used
 * to send the response back to  * the client. It contains methods and
 * properties that allow you to control the response, such as setting
 * the status code, sending data, and setting headers.
 * @returns a response object with a status code and a message. If a
 * user is found, it also includes the found user object in the response.
 */

// Get user by Id
const getUserById = async (req, res) => {
  
  try {
    const userId = req.params.userId;
    let foundUser = await User.findOne({ uid: userId });

    if (foundUser) {
      return res.status(200).send({ message: `User found!`, user: foundUser });
    }

    return res.status(200).send({ message: `User not found!` });
    
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while saving user to your MongoDB database", 500);
    return next(error);
  }
};
/***************** END: GET USER INFO USING A CONTROLLER ******************/

//Create a new user
const createNewUser = async (req, res) => {

  try {
    let user = new User({
      uid: req.body.uid,
      name: req.body.name,
      username: req.body.username,
    });

    await user.save();

    res.status(200).send({ message: `User ${user.username} created successfully!`,});

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while creating a new user.', 500);
    return next(error);
  } 
};

//Update user information
const updateUser = async (req, res) => {

  try {
    const userId = req.params.userId;
    let foundUser = await User.findOne({ uid: userId });

    if (foundUser) {
      foundUser.name = req.body.name;
      foundUser.username = req.body.username;

      await foundUser.save();

      return res.status(200).send({ message: `User details updated!`});
    }
    return res.status(200).send({ message: `User not found!` });

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while updating a user.', 500);
    return next(error);
  }
};

//Get the latest searches for a user.
const getLatestSearches = async (req, res) => {
  try {
    const user_id = req.params.userId;

    // Create and save the latest search record
    const latestSearches = await Search.find({
      user_id: user_id,
    });

    const latestSearchQueue = [];

    // Update the queue with the latest occurrence of each search query
    latestSearches.forEach((latestSearch) => {
      const searchQuery = latestSearch.search_query;
      const index = latestSearchQueue.findIndex((item) => item.search_query === searchQuery);

      if (index !== -1) {
        // If the search query is already in the queue, update it with the latest timestamp
        latestSearchQueue[index] = latestSearch;
      } else {
        // If the search query is not in the queue, add it to the end
        latestSearchQueue.push(latestSearch);
      }
    });

    // Sort the searches by timestamp in ascending order
    latestSearchQueue.sort((a, b) => a.timestamp - b.timestamp);

    // Keep only the latest 6 entries
    const latestSearchesToKeep = latestSearchQueue.slice(-6);

    res.json({
      latestSearches: latestSearchesToKeep.map((latestSearch) => latestSearch.search_query),
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while getting latest searches', 500);
    return next(error);
  } 
};

//Delete the latest searches for a user.
const deleteLatestSearches =  async (req, res, next) => {
  const user_id = req.params.userId;

    try {
      const latestSearch = await Search.deleteMany({ user_id });

      if (latestSearch.deletedCount === 0) {
        return res
          .status(404)
          .json({ message: "Could not find latest searches for the provided id." });
      }

      res.status(200).json({ message: "Latest searches deleted." });
    } catch (err) {
      console.log(err);
      const error = new HttpError(`An error occurred while deleting latest searches: ${error.message}`, 500);
      return next(error);
    } 
};

exports.getUserById = getUserById;
exports.createNewUser = createNewUser;
exports.updateUser = updateUser;
exports.getLatestSearches = getLatestSearches;
exports.deleteLatestSearches = deleteLatestSearches;
