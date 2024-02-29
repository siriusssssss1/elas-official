const db = require("../models");
const FavoriteNote = db.favoriteNote;
const FavoriteCourse = db.favoriteCourse;
const Note = db.note;
const Course = db.course;
const HttpError = db.httpError;

// Toggel favorite status for a note.
const toggelFavoriteNote = async (req, res, next) => {

  const user_id = req.body.user_id;
  const { note_id } = req.params;
  const payload = {
    note_id: note_id,
    user_id: user_id,
  };

  try {
    const note = await Note.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Note not found."});
    }

    const newFavorite = new FavoriteNote(payload);
    await newFavorite.save();
   
    res.status(201).json({ message: "Updated successfully !"});

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occured while adding a note to favorites.", 500);
    return next(error);
  }
};

// Get favorite notes for a specific user - Grid view of the Favorites page.
const getFavNoteByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const groupedNotes = [];

    let favorites = await FavoriteNote.find({
      user_id: user_id,
    });

    const notes = await Note.find({
      _id: { $in: favorites.map((favorite) => favorite.note_id) },
    });

    res.json({
      notes: notes.map((note) => ({
        ...note._doc,
        isFavorite: true,
      })),
    });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching favorite notes.", 500);
    return next(error);
  }
};

// Toggel favorite status for a course.
const toggelFavoriteCourse = async (req, res, next) => {
  const user_id = req.body.user_id;
  const { course_id } = req.params;

  const payload = {
    course_id: course_id,
    user_id: user_id,
  };
  
  try {
    const course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({ message: "Course not found."});
    }

    const newFavorite = new FavoriteCourse(payload);
    await newFavorite.save();

    res.status(201).json({message: "Updated successfully !"});

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occured while adding a course to favorites.", 500);
    return next(error);
  }
};

// Get favorite courses for a specific user - Grid view of the Favorites page.
const getFavCourseByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    let favorites = await FavoriteCourse.find({user_id: user_id});

    const courses = await Course.find({
      _id: { $in: favorites.map((favorite) => favorite.course_id) },
    });

    res.json({
      courses: courses.map((course) => ({
        ...course._doc,
        isFavorite: true,
      })),
    });
    
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching favorite courses.", 500);
    return next(error);
  }
};


exports.toggelFavoriteNote = toggelFavoriteNote;
exports.getFavNoteByUserId = getFavNoteByUserId;
exports.toggelFavoriteCourse = toggelFavoriteCourse;
exports.getFavCourseByUserId = getFavCourseByUserId;
