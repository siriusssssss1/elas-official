const favoriteModel = require("../models/favoriteModel");
const favoriteCourseModel = require("../models/favoriteCourseModel");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const noteModel = require("../models/noteModel");
const courseModel = require("../models/courseModel");

const toggetFavoriteNote = async (req, res, next) => {

  const user_id = req.body.user_id;
  const { note_id } = req.params;
  const payload = {
    note_id: note_id,
    user_id: user_id,
  };
  try {
    const favorite = await favoriteModel.findOne(payload);

    if (favorite) {
      await favoriteModel.deleteOne(payload);
    } else {
      const favorite = new favoriteModel(payload);
      await favorite.save();
    }

    // await session.commitTransaction();
    // await session.endSession();

    res.status(201).json({
      message: "Updated successfully !",
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(" Please try again later.", 500);
    // await session.abortTransaction();
    // await session.endSession();

    return next(error);
  }
};

// Get user notes by user_id
const getFavNoteByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const groupedNotes = [];

    let favorites = await favoriteModel.find({
      user_id: user_id,
      // note_id: { $in: user.notes },
    });
    console.log(favorites);

    const notes = await noteModel.find({
      _id: { $in: favorites.map((favorite) => favorite.note_id) },
    });

    console.log(notes);

    res.json({
      notes: notes.map((note) => ({
        ...note._doc,
        isFavorite: true,
      })),
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

const toggetFavoriteCourse = async (req, res, next) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();
  const user_id = req.body.user_id;
  const { course_id } = req.params;

  const payload = {
    course_id: course_id,
    user_id: user_id,
  };
  try {
    const favorite = await favoriteCourseModel.findOne(payload);

    if (favorite) {
      await favoriteModelCourses.deleteOne(payload);
    } else {
      const favorite = new favoriteCourseModel(payload);
      await favorite.save();
    }


    res.status(201).json({
      message: "Updated successfully !",
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(" Please try again later.", 500);

    return next(error);
  }
};

const getFavCourseByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  console.log("user_id", user_id);

  try {
    //const groupedNotes = [];

    let favorites = await favoriteCourseModel.find({
      user_id: user_id,
      // course_id: { $in: user.courses },
    });

    const courses = await courseModel.find({
      _id: { $in: favorites.map((favorite) => favorite.course_id) },
    });

    console.log(courses)

    res.json({
      courses: courses.map((course) => ({
        ...course._doc,
        isFavorite: true,
      })),
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};


exports.toggetFavoriteNote = toggetFavoriteNote;
exports.getFavNoteByUserId = getFavNoteByUserId;
exports.toggetFavoriteCourse = toggetFavoriteCourse;
exports.getFavCourseByUserId = getFavCourseByUserId;
