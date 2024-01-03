const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const noteModel = require("../models/noteModel");
const draftModel = require("../models/draftModel");

const getDraftByUserId = async (req, res, next) => {
    const user_id = req.params.user_id;
  
    console.log("user_id", user_id);
  
    try {
  
      let drafts = await draftModel.find({
        user_id: user_id,
        // note_id: { $in: user.notes },
      });
  
      const notes = await noteModel.find({
        _id: { $in: drafts.map((draft) => draft.note_id) },
      });
  
      console.log(notes)
  
      res.json({
        notes: notes.map((note) => ({
          ...note._doc,
          isDraft: true,
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

// const createDraft = async (req, res) => {
//     try {
//       const newDraft = new draftModel({
//         user_id: req.params.user_id,
//         note_id: req.params.note_id,
//       });
//       const savedDraft = await newDraft.save();
//       res.json(savedDraft);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

const addNoteToDraft =  async (req, res) => {
  const note_id = req.params.note_id;
  const user_id = req.params.user_id;

  const payload = {
    note_id: note_id,
    user_id: user_id,
  };

  console.log(note_id);
  try {

    const draft = await draftModel.findOne(payload);

    const note = await noteModel.findOne({_id:note_id});


    draft.note_id.push(note._id);
    await draft.save();

    await note.save();

    res.json({ message: "Note added to drafts." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add note to drafts." });
  }
};

  const updateDraft = async (req, res) => {
    try {
      const noteId = req.params.id;
      const { title, content, courseId } = req.body;
  
      let updatedNote;
  
      if (courseId) {
        // Move to a course
        updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { $set: { title, content, isDraft: false, course: courseId } },
          { new: true }
        );
      } else {
        // Update the draft
        updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { $set: { title, content } },
          { new: true }
        );
      }
  
      // Delete the corresponding draft after moving to a course or updating
      if (updatedNote.isDraft) {
        await Draft.findOneAndDelete({ noteId: noteId });
      }
  
      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getDraftByUserId = getDraftByUserId;
  exports.addNoteToDraft = addNoteToDraft;
  exports.updateDraft = updateDraft;