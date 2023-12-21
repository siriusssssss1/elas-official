const draftModel = require("../models/draftModel");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const noteModel = require("../models/noteModel");


const toggetDraftNote = async (req, res, next) => {
  const user_id = req.body.user_id;
  const { note_id } = req.params;
  const payload = {
    note_id: note_id,
    user_id: user_id,
  };
  try {
    const draft = await draftModel.findOne(payload);

    if (draft) {
      await draftModel.deleteOne(payload);
    } else {
      const draft = new draftModel(payload);
      await draft.save();
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


const getDraftNoteByUserId = async (req, res, next) => {
    const user_id = req.params.user_id;
  
    console.log("user_id", user_id);
  
    try {
      const groupedNotes = [];
  
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


exports.toggetDraftNote = toggetDraftNote;
exports.getDraftNoteByUserId = getDraftNoteByUserId;
