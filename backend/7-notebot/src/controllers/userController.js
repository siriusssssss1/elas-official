const db = require("../models");
const searchModel = require("../models/searchModel");
const User = db.user;

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
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    let foundUser = await User.findOne({ uid: userId });
    if (foundUser) {
      return res.status(200).send({ message: `User found!`, user: foundUser });
    }
    return res.status(200).send({ message: `User not found!` });
  } catch (err) {
    res
      .status(500)
      .send({ message: `Error saving user to your MongoDB database` });
    return;
  }
};
/***************** END: GET USER INFO USING A CONTROLLER ******************/

const createNewUser = async (req, res) => {
  try {
    let user = new User({
      uid: req.body.uid,
      name: req.body.name,
      username: req.body.username,
    });
    await user.save();
    res.status(200).send({
      message: `User ${user.username} created successfully!`,
    });
  } catch (err) {
    res.status(500).send({ message: `Error saving user to DB` });
    return;
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    let foundUser = await User.findOne({ uid: userId });
    console.log(foundUser);
    if (foundUser) {
      foundUser.name = req.body.name;
      foundUser.username = req.body.username;
      await foundUser.save();
      return res.status(200).send({
        message: `User details updated!`,
      });
    }
    return res.status(200).send({ message: `User not found!` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Error saving user to DB.` });
    return;
  }
};

// const getLatestSearches = async (req, res) => {
//   try {
//     const user_id = req.params.userId;

//     // Create and save the latest search record
//     const latestSearches = await searchModel.find({
//       user_id: user_id,
//     });

//     const latestSearchQueryMap = new Map();

//     // Update the Map with the latest occurrence of each search query
//     latestSearches.forEach((latestSearch) => {
//       const searchQuery = latestSearch.search_query;
//       if (!latestSearchQueryMap.has(searchQuery) || latestSearch.timestamp > latestSearchQueryMap.get(searchQuery).timestamp) {
//         latestSearchQueryMap.set(searchQuery, latestSearch);
//       }
//     });

//     // Convert Map values back to an array for the response
//     const uniqueLatestSearches = Array.from(latestSearchQueryMap.values());

//     // Sort the searches by timestamp in descending order
//     const sortedLatestSearches = uniqueLatestSearches.sort((a, b) => b.timestamp - a.timestamp);

//     // Keep only the first 6 entries
//     const latestSearchesToKeep = sortedLatestSearches.slice(0, 6);

//     res.json({
//       latestSearches: latestSearchesToKeep.map((latestSearch) => latestSearch.search_query),
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


const getLatestSearches = async (req, res) => {
  try {
    const user_id = req.params.userId;

    // Create and save the latest search record
    const latestSearches = await searchModel.find({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




exports.getUserById = getUserById;
exports.createNewUser = createNewUser;
exports.updateUser = updateUser;
exports.getLatestSearches = getLatestSearches;
