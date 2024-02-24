const db = require("../models");
const mongoose = require("mongoose");
const Note = db.note;
const User = db.user;
const Section = db.section;
const Course = db.course;
const Widget = db.widget;
const Search = db.search;
const FavoriteNote = db.favoriteNote;
const HttpError = db.httpError;

//Test route to get all notes.
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ isPublic: true });

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No public notes found" });
    }

    res.json({ notes: notes.map((note) => note.toObject({ getters: true })) });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching notes. ", 500);
    return next(error);
  }
};

//Get widgets for a specific note - Grid view SavedNotes page.
const getNoteWidgets = async (req, res, next) => {

  try {
    const note = await Note.findById(req.params.note_id);
    const sections = await Section.find({ _id: { $in: note.sections } });

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

    const widgets = await Widget.find({
      section_id: { $in: note.sections },
    });

    res.json({ note, sections, widgets });

  } catch (err) {
    const error = new HttpError("An error occurred while fetching notes. ", 500);
    return next(error);
  }
};

//Get notes for a specific user - Grid view of the Dashboard page.
const getNoteByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;
  
  try {
    const user = await User.findOne({uid: user_id}).populate('notes');
    const notes = await Note.find({ uid: user_id, isPublic: true }); 

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided user id." });
    }
    
    if (!user.notes || user.notes.length === 0) {
        res.json({ notes: [] });
        return;
    }

    const groupedNotes = {};

    let favorites = await FavoriteNote.find({
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
        course = await Course.findOne({ _id: courseId });
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

    const groupedNotesArray = Object.values(groupedNotes);

    res.json({ notes: groupedNotesArray });
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching notes. ", 500);
    return next(error);
  }
};

//Create a new note - AddNote button in the Dashboard page.
const createNote = async (req, res, next) => {
  const user_id = req.body.user_id;
  const { title, isPublic, sections, widgets } = req.body;

  try {
    if (!user_id || !title  || !sections || !widgets) {
      return res.status(400).json({ message: "Missing required fields." });
      
    }
    const user = await User.findOne({ uid: user_id });

    if (!user.notes) {
      user.notes = [];
    }
    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided id." });
    }

    const createdNote = new Note({
      title: title,
      isPublic: false,
      avg_rate: 4,
      user_id: user_id,
    });

    await createdNote.save();

    for (const section of sections) {
      const sectionObject = new Section({
        layout_field: section.layout_field,
        note_id: createdNote._id,
      });

      await sectionObject.save();

      createdNote.sections.push(sectionObject._id);

      if (widgets[section.id]) {
        for (let widgetIndex in widgets[section.id]) {
          const widget = widgets[section.id][widgetIndex];

          const widgetObject = new Widget({
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
    const error = new HttpError("Adding Note , Sections , Widgets failed! please try again later.", 500);
    return next(error);
  }
};

//Update a specific note - Clicking on a note in the Dashboard page.
const updateNote = async (req, res, next) => {

  try {
    const user_id = req.body.user_id;
    const { title, sections, widgets, course_id } = req.body;

    const note = await Note.findById(req.params.note_id);
    const course = await Course.findById(course_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    note.title = title;
    note.sections = [];

    for (const section of sections) {
      let sectionObject =
        section._id && (await Section.findById(section._id));
      
      if (!sectionObject) {
        sectionObject = new Section();
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

          let widgetObject = widget._id && (await Widget.findById(widget._id));

          if (!widgetObject) {
            widgetObject = new Widget();
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
    const error = new HttpError("An error occurred while fetching notes. ", 500);
    return next(error);
  }
};

//Delete a specific note - Clicking on the delete button in the NoteDetails page.
const deleteNote = async (req, res, next) => {
  const note_id = req.params.note_id;

  try {
    const note = await Note.findByIdAndDelete(note_id);

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

    const user = await User.findOne({uid:note.user_id}); 
    const course = await Course.findOne({_id:note.course_id});

    await User.updateMany(
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
      await Course.updateMany(
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
      const section = await Section.findByIdAndDelete(sectionId);

      if (section) {
        const widgetIds = section.widgets;

        for (const widgetId of widgetIds) {
          const widget = await Widget.findByIdAndDelete(widgetId);
        }
      }
    } 
    res.json({ message: "Note deleted!", note });

  } catch (err) {
    console.log(err);
    const error = new HttpError("Deleting note failed, please try again later.", 500);
    return next(error);
  }
};


//Get notes by user ID and course ID - Show more link in the Dashboard page.
const getNotesByUserIdAndCourseId = async (req, res, next) => {
  const { user_id, course_id } = req.params;

  try {
    const user = await User.findOne({uid:user_id}).populate("notes");

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
    const error = new HttpError("An error occurred while fetching notes. ", 500);
    return next(error);
  }
};

//Get notes by course and note title - Search bar in the Dashboard page.
const getNotesByCourseAndNoteTitle = async (req, res, next) => {
  const searchKeyword = req.params.keyword;
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); 
  }
  const escapeKeyword = escapeRegExp(searchKeyword);

  try {
    const courses = await Course.find({
      title: { $regex: escapeKeyword, $options: "i" }, 
    });
    const courseIds = courses.map((course) => course._id);

    const notes = await Note
      .find({$or: [{course_id: { $in: courseIds }},{title: { $regex: escapeKeyword, $options: "i" }, isPublic: true }]})
      .populate("course_id", "title")
      .populate("user_id", "user_name")
      .select("note_id title");
    

    const user_id = req.headers.user_id;
    const latestSearch = new Search({user_id, search_query:searchKeyword, timestamp:new Date()})

    await latestSearch.save();

    let favorites = await FavoriteNote.find({
      user_id,
      note_id: { $in: notes.map((note) => note._id.toString()) },
    });

    favorites = favorites.reduce( 
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
    const error = new HttpError("An error occurred while searching notes.", 500);
    return next(error);
  }
};

//Get saved notes for a specific user - Grid view SavedNotes page.
const getSavedNotesByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const notes = await Note
      .find({ user_id: user_id })
      .populate("course_id", "title")
      .populate("user_id", "user_name")
      .select("note_id title");

    res.json(notes);

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching notes.", 500);
    return next(error);
  }
};

//Save a note for a user - Clicking on the save button in the Search page.
const saveNote = async (req, res, next) => {
  const { user_id, note_id } = req.params;

  try {
    const user = await User.findOne({uid:user_id});

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided id." });
    }

    const note = await Note.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find note for the provided id." });
    }

    if (note.user_id.toString() === user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot save a note written by yourself." });
    }

    const isNoteSaved = note.saved_by.includes(user.uid);

    if (isNoteSaved) {
      return res
        .status(400)
        .json({ message: "Note is already saved by the user." });
    }

    note.saved_by.push(user.uid);
    await note.save();

    res.json({ message: "Note saved successfully." });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while saving the note.", 500);
    return next(error);
  }
};

//Push sections to a note - Add sections to a note.
const pushSectionsToNote = async (req, res, next) => {
  const { note_id, section_ids } = req.body;

  try {
    const note = await Note.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    
    note.sections.push(...section_ids);
    await note.save();

    res.status(200).json({ message: "Sections added to note.", note });

  } catch (err) {
    console.log(err);
    const error = new HttpError("Adding sections to note failed, please try again later.", 500);
    return next(error);
  }
};

//Get a note by its ID - Get details of a specific note.
const getNoteByNoteId = async (req, res, next) => {
  const { user_id, note_id } = req.params;

  try {
    const note = await Note.findById(note_id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Could not find notes for the provided user id." });
    }

    for (const section_id of note.sections) {
      const section = await Section.findById(section_id);

      if (section) {
        for (let widget_ids of section) {
          const widget = await Widget.findById(widget_ids);
        }
      }
    }
    res.json({ notes: groupedNotesArray });

  } catch (err) {
    const error = new HttpError("An error occurred while fetching notes.", 500);
    return next(error);
  }
};

//Update the rating of a specific note.
const updateRating = async (req, res, next) => {
  const userId = req.body.user_id; 
  const { noteId, rating } = req.body;
  console.log("Received parameters: noteId =", noteId, "userId =", userId, "rating =", rating);
  try {
    let updatedNote;

    const existingRating = await Note.findOne({
      _id: noteId,
      "ratings.userId": userId,
    });

    if (existingRating) {
      updatedNote = await Note.findOneAndUpdate(
        { _id: noteId, "ratings.userId": userId },
        { $set: { "ratings.$.rating": rating } },
        { new: true }
      );

    } else {
      updatedNote = await Note.findOneAndUpdate(
        { _id: noteId },
        { $push: { ratings: { userId, rating } } },
        { new: true }
      );
    }

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
    const error = new HttpError("Updating note rating failed, please try again later.", 500);
    return next(error);
  }
};

//Add a note to a specific course.
const addNoteToCourse = async (req, res, next) => {
  const { course_id } = req.params;

  try {
    const course = await Course.findById(course_id);
    const note = await Note.findById(req.body.note_id);


    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    note.isPublic = true;

    await note.save();

    course.notes.push(note._id);
    await course.save();

    note.course_id = course_id;
    await note.save();

    res.json({ message: "Note added to the course." });
  } catch (err) {
    const error = new HttpError("Failed to add note to the course.", 500);
    return next(error);
  }
};

// const createNoteWithEmptySections = async (req, res, next) => {
//   const { user_id, title, isPublic, course_id } = req.body;

//   try {

//     const createdNote = new Note({
//       user_id,
//       title,
//       isPublic,
//       course_id,
//       sections: [],
//     });

//     await createdNote.save();

//     res.status(201).json({ message: "Note created!", note: createdNote });
//   } catch (err) {
//     const error = new HttpError(
//       "Creating note failed, please try again later.",
//       500
//     );
//     return next(error);
//   }
// };

// const getNoteByNoteID = async (req, res, next) => {
//   const { note_id } = req.params;

//   try {
//     const note = await Note.findById(note_id);

//     if (!note) {
//       return res
//         .status(404)
//         .json({ message: "Could not find note for the provided ID." });
//     }

//     res.json({ note: note.toObject({ getters: true }) });
//   } catch (err) {
//     const error = new HttpError(
//       "An error occurred while fetching the note.",
//       500
//     );
//     return next(error);
//   }
// };


exports.getNotes = getNotes;
exports.getNoteWidgets = getNoteWidgets;
exports.getNoteByUserId = getNoteByUserId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
exports.getNotesByUserIdAndCourseId = getNotesByUserIdAndCourseId;
exports.getNotesByCourseAndNoteTitle = getNotesByCourseAndNoteTitle;
exports.getSavedNotesByUserId = getSavedNotesByUserId;
exports.saveNote = saveNote;
exports.pushSectionsToNote = pushSectionsToNote;
exports.getNoteByNoteId = getNoteByNoteId;
exports.updateRating = updateRating;
exports.addNoteToCourse = addNoteToCourse;
//exports.createNoteWithEmptySections = createNote;
//exports.getNoteByNoteID = getNoteByNoteID;