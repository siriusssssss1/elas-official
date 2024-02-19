const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");
const sectionModel = require("../models/sectionModel");
const courseModel = require("../models/courseModel");
const widgetModel = require("../models/widgetModel");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const favoriteModel = require("../models/favoriteModel");
// const draftModel = require("../models/draftModel");
// const { search } = require("../routes/notes");
const searchModel = require("../models/searchModel");



// Get user notes by user_id
const getNoteByNoteId = async (req, res, next) => {
  const { user_id, note_id } = req.params;

  try {
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find notes for the provided user id." });
    }

    for (const section_id of note.sections) {
      const section = await sectionModel.findById(section_id);

      if (section) {
        for (let widget_ids of section) {
          const widget = await widgetModel.findById(widget_ids);
        }
      }
    }

    res.json({ notes: groupedNotesArray });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

//Get all notes by user_id and course_id
const getNotesByUserIdAndCourseId = async (req, res, next) => {
  const { user_id, course_id } = req.params;

  try {
    const user = await userModel.findOne({uid:user_id}).populate("notes");

    if (!user.notes || user.notes.length === 0) {
      return res
        .status(404)
        .json({ message: "Could not find notes for the provided user id." });
    }

    res.json({
      notes: user.notes
        .filter((note) => note.course_id.toString() === course_id)
        .map((note) => note.toObject({ getters: true })),
    });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

// Get user notes by user_id
const getNoteByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;
  
  try {
    const user = await userModel.findOne({uid: user_id}).populate('notes');
    const notes = await noteModel.find({ uid: user_id, isPublic: true }); 

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided user id." });
    }
    console.log(user.notes); 
    
    if (!user.notes || user.notes.length === 0) {
        res.json({ notes: [] });
        return;
    }

    // Group notes by course ID
    const groupedNotes = {};

    let favorites = await favoriteModel.find({
      user_id: user_id,
      note_id: { $in: user.notes },
    });

    favorites = favorites.reduce((acc, fav) => {
      return {
        ...acc,
        [fav.note_id]: true,
      };
    }, {});
    
    for (let note of user.notes) {
      const courseId = note.course_id; //._id; //.toString();
    
      let course;
      if (courseId) {
        course = await courseModel.findOne({ _id: courseId });
      }
  
      if (!course) {
        course = {
          _id: "",
          title: "Without course",
        };
      }

      if (!groupedNotes[courseId]) {
        groupedNotes[courseId] = {
          course_id: course._id,
          course_title: course.title,
          notes: [],
        };
      }

      groupedNotes[courseId].notes.push({
        ...note._doc,
        isFavorite: Boolean(favorites[note._id]),
      });
    }

    // Convert the grouped notes object to an array
    const groupedNotesArray = Object.values(groupedNotes);

    res.json({ notes: groupedNotesArray });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

// Get all notes by course title
const getNotesByCourseAndNoteTitle = async (req, res, next) => {
  const searchKeyword = req.params.keyword;
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  }
  const escapeKeyword = escapeRegExp(searchKeyword);

  try {
    // Get all courses that match the search keyword
    const courses = await courseModel.find({
      title: { $regex: escapeKeyword, $options: "i" }, //Form String beschreiben (z.B. email)
    });

    const courseIds = courses.map((course) => course._id);

    // Get all notes that match the course ids
    const notes = await noteModel
      .find({$or: [{course_id: { $in: courseIds }},{title: { $regex: escapeKeyword, $options: "i" }, isPublic: true }]})
      .populate("course_id", "title")
      .populate("user_id", "user_name")
      .select("note_id title");
    

    const user_id = req.headers.user_id;

    const latestSearch = new searchModel({user_id, search_query:searchKeyword, timestamp:new Date()})

    await latestSearch.save();

    let favorites = await favoriteModel.find({
      user_id,
      note_id: { $in: notes.map((note) => note._id.toString()) },
    });

    favorites = favorites.reduce( //was macht das?
      (acc, fav) => ({
        ...acc,
        [fav.note_id]: true,
      }),
      {}
    );

    res.json(
      notes.map((note) => ({
        ...note._doc,
        isFavorite: Boolean(favorites[note._id]),
      }))
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

const createNoteWithEmptySections = async (req, res, next) => {
  const { user_id, title, isPublic, course_id } = req.body;

  try {
    // Input validation and error handling...

    const createdNote = new noteModel({
      user_id,
      title,
      isPublic,
      course_id,
      sections: [],
    });

    await createdNote.save();

    res.status(201).json({ message: "Note created!", note: createdNote });
  } catch (err) {
    const error = new HttpError(
      "Creating note failed, please try again later.",
      500
    );
    return next(error);
  }
};

// push a section to a note
const pushSectionsToNote = async (req, res, next) => {
  const { note_id, section_ids } = req.body;

  try {
    // Input validation and error handling...
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    
    note.sections.push(...section_ids);
    await note.save();
    

    res.status(200).json({ message: "Sections added to note.", note });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Adding sections to note failed, please try again later.",
      500
    );
    return next(error);
  }
};

const createNote = async (req, res, next) => {
  

  const user_id = req.body.user_id;
  console.log(user_id);

  const { title, isPublic, sections, widgets } = req.body;

  try {
    // Input validation
    if (!user_id || !title  || !sections || !widgets) {
      return res.status(400).json({ message: "Missing required fields." });
      
    }
    const user = await userModel.findOne({ uid: user_id });


    if (!user.notes) {
      user.notes = [];
    }

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided id." });
    }

    const createdNote = new noteModel({
      title: title,
      isPublic: false,
      avg_rate: 4,
      user_id: user_id,
    });
    await createdNote.save();

    for (const section of sections) {
      const sectionObject = new sectionModel({
        layout_field: section.layout_field,
        note_id: createdNote._id,
      });
      await sectionObject.save();

      createdNote.sections.push(sectionObject._id);

      if (widgets[section.id]) {
        for (let widgetIndex in widgets[section.id]) {
          const widget = widgets[section.id][widgetIndex];

          const widgetObject = new widgetModel({
            type: widget.type,
            data: widget.data,
            layout_index: parseInt(widgetIndex),
            section_id: sectionObject._id,
          });

          await widgetObject.save();

          sectionObject.widgets.push(widgetObject._id);
        }
        await sectionObject.save();
      }
    }

    user.notes.push(createdNote._id);

    await user.save();

    res.status(201).json({
      message: "Note , Sections , Widgets created successfully !",
      note: createdNote,
    });
  } catch (err) {
    console.log(err);
    
    const error = new HttpError(
      "Adding Note , Sections , Widgets failed! please try again later.",
      500
    );

    return next(error);
  }
};

//delete note
const deleteNote = async (req, res, next) => {
  const note_id = req.params.note_id;

  try {
    const note = await noteModel.findByIdAndDelete(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    if (note.user_id.toString() !== req.headers.user_id) {
      return res
        .status(401)
        .json({ message: "You don't have permissions to delete this note." });
    }

    const user = await userModel.findOne({uid:note.user_id}); 
    const course = await courseModel.findOne({_id:note.course_id});

    await userModel.updateMany(
      {uid: note.user_id},
      {
        $pull: {
          notes: note_id,
        },
      },
      { new: true }
    );
  
    if (course) {
      const courseId2 = new mongoose.Types.ObjectId(note.course_id);
      await courseModel.updateMany(
        {_id: courseId2 },
        {
          $pull: {
            notes: note_id,
          },
        },
        { new: true }
      );
    }

    const sectionIds = note.sections;

    for (const sectionId of sectionIds) {
      // Find and delete the section
        const section = await sectionModel.findByIdAndDelete(sectionId);

        if (section) {
          // Delete widgets associated with the section
            const widgetIds = section.widgets;
            console.log(widgetIds);

            for (const widgetId of widgetIds) {
              const widget = await widgetModel.findByIdAndDelete(widgetId);
            }
          }
        }  

    res.json({ message: "Note deleted!", note });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Deleting note failed, please try again later.",
      500
    );
    return next(error);
  }
};

// save note
const saveNote = async (req, res, next) => {
  const { user_id, note_id } = req.params;

  try {
    // Find the user by user_id
    const user = await userModel.findOne({uid:user_id});

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided id." });
    }

    // Find the note by note_id
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    // Check if the user who wrote the note is different from the user trying to save it
    if (note.user_id.toString() === user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot save a note written by yourself." });
    }

    // Check if the user has already saved the note
    const isNoteSaved = note.saved_by.includes(user.uid);

    if (isNoteSaved) {
      return res
        .status(400)
        .json({ message: "Note is already saved by the user." });
    }

    // Save the note for the user
    note.saved_by.push(user.uid);
    await note.save();

    res.json({ message: "Note saved successfully." });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while saving the note.",
      500
    );
    return next(error);
  }
};

//get saved notes of a user
const getSavedNotesByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const notes = await noteModel
      .find({ user_id: user_id })
      .populate("course_id", "title")
      .populate("user_id", "user_name")
      .select("note_id title");
    
    console.log(notes);

    res.json(notes);
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching notes.", 500);
    return next(error);
  }
};

//get all notes
const getNotes = async (req, res, next) => {
  try {
    const notes = await noteModel.find({ isPublic: true });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No public notes found" });
    }

    res.json({ notes: notes.map((note) => note.toObject({ getters: true })) });

  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};


const getNoteByNoteID = async (req, res, next) => {
  const { note_id } = req.params;

  try {
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided ID." });
    }

    res.json({ note: note.toObject({ getters: true }) });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching the note.",
      500
    );
    return next(error);
  }
};

const getNoteWidgets = async (req, res, next) => {
  try {
    const note = await noteModel.findById(req.params.note_id);
    const sections = await sectionModel.find({ _id: { $in: note.sections } });

    const indexDictionary = note.sections.reduce(
      (acc, id, index) => ({
        ...acc,
        [id]: index,
      }),
      {}
    );

    sections.sort((a, b) => {
      const aIndex = indexDictionary[a._id];
      const bIndex = indexDictionary[b._id];
      if (aIndex < bIndex) {
        return -1;
      }
      if (aIndex > bIndex) {
        return 1;
      }

      return 0;
    });
    const widgets = await widgetModel.find({
      section_id: { $in: note.sections },
    });

    res.json({ note, sections, widgets });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    
    const user_id = req.body.user_id;
   
    const { title, sections, widgets, course_id } = req.body;

    const note = await noteModel.findById(req.params.note_id);
    const course = await courseModel.findById(course_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    note.title = title;

    
    note.sections = [];

    for (const section of sections) {
      let sectionObject =
        section._id && (await sectionModel.findById(section._id));
      

      if (!sectionObject) {
        sectionObject = new sectionModel();
      }

      sectionObject.layout_field = section.layout_field || undefined;
      sectionObject.note_id = note._id;

      await sectionObject.save();

      if (!note.sections.find((_id) => _id === sectionObject._id)) {
        note.sections.push(sectionObject._id);
      }

      const sectionWidgets = widgets[section._id || section.id];
      if (sectionWidgets) {
        for (let widgetIndex in sectionWidgets) {
          const widget = sectionWidgets[widgetIndex];

          let widgetObject =
            widget._id && (await widgetModel.findById(widget._id));

          if (!widgetObject) {
            widgetObject = new widgetModel();
          }

          widgetObject.type = widget.type;
          widgetObject.data = widget.data;
          widgetObject.layout_index = parseInt(widgetIndex);
          widgetObject.section_id = sectionObject._id;

          await widgetObject.save();

          sectionObject.widgets.push(widgetObject._id);
        }
        await sectionObject.save();
      }
    }
    if (!course_id) {
      note.isDraft = true;
      note.isPublic = false;
    } else {
      //
    }

    await note.save();
    
    course.notes.push(note._id);
    await course.save();

    res.json({ note, sections, widgets });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};

// Update Note Rating
const updateRating = async (req, res, next) => {
  const userId = req.body.user_id; 
  const { noteId, rating } = req.body;
  console.log("Received parameters: noteId =", noteId, "userId =", userId, "rating =", rating);
  try {
    let updatedNote;

    // Check if the user has rated before for this note
    const existingRating = await noteModel.findOne({
      _id: noteId,
      "ratings.userId": userId,
    });

    if (existingRating) {

      // Update the existing rating
      updatedNote = await noteModel.findOneAndUpdate(
        { _id: noteId, "ratings.userId": userId },
        { $set: { "ratings.$.rating": rating } },
        { new: true }
      );
    } else {
      
      // Add a new rating if the user is rating for the first time
      updatedNote = await noteModel.findOneAndUpdate(
        { _id: noteId },
        { $push: { ratings: { userId, rating } } },
        { new: true }
      );
    }
    console.log("Updated note:", updatedNote);
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Could not find note or user rating." });
    }

    res.status(200).json({
      message: "Note rating updated!",
      note: updatedNote,
    });
  } catch (err) {
    console.error("Error updating note rating:", err);
    const error = new HttpError(
      "Updating note rating failed, please try again later.",
      500
    );
    return next(error);
  }
};

const addNoteToCourse = async (req, res, next) => {
  const { course_id } = req.params;

  try {
    const course = await courseModel.findById(course_id);
    const note = await noteModel.findById(req.body.note_id);
    console.log(note);


    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    note.isPublic = true;

    // Save the new section
    await note.save();

    // Update the note's sections array with the newly created section
    course.notes.push(note._id);
    await course.save();

    note.course_id = course_id;
    await note.save();

    res.json({ message: "Note added to the course." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add note to the course." });
  }
};

exports.getNoteWidgets = getNoteWidgets;

exports.getNotesByUserIdAndCourseId = getNotesByUserIdAndCourseId;
exports.getNoteByUserId = getNoteByUserId;
exports.getNotesByCourseAndNoteTitle = getNotesByCourseAndNoteTitle;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
exports.getNotes = getNotes;

exports.saveNote = saveNote;
exports.getSavedNotesByUserId = getSavedNotesByUserId;

exports.getNoteByNoteId = getNoteByNoteId;
exports.getNoteByNoteID = getNoteByNoteID;
exports.createNoteWithEmptySections = createNote;
exports.pushSectionsToNote = pushSectionsToNote;

exports.updateRating = updateRating;
exports.addNoteToCourse = addNoteToCourse;