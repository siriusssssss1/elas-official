const db = require("../models");
const Note = db.note;
const Draft = db.draft;
const HttpError = db.httpError;

// Retrieve draft notes belonging to a user by their user ID. - Grid view of the My Drafts Page.
const getDraftByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    let drafts = await Draft.find({
      user_id: user_id,
    });

    const notes = await Note.find({
      _id: { $in: drafts.map((draft) => draft.note_id) },
    });

    res.json({
      notes: notes.map((note) => ({
        ...note._doc,
        isDraft: true,
        isPublic: false
      })),
    });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching drafts.", 500);
    return next(error);
  }
};

// Add a note to drafts for a user. - Clicking on "Or add to drafts" on the Add note to course Pop-up window.
const addNoteToDraft = async (req, res) => {
  const { note_id, user_id } = req.body;
  const payload = {
    note_id: note_id,
    user_id: user_id,
  };

  try {
    const note = await Note.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
      const draft = await Draft.findOne(payload);
      if (draft) {
        await Draft.deleteOne(payload);
      } else {
        const draft = new Draft(payload);
        await draft.save();
      }

      res.status(201).json({
        message: "Updated successfully !",
    });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while adding a note to drafts.", 500);
    return next(error);
  }
}; 

exports.getDraftByUserId = getDraftByUserId;
exports.addNoteToDraft = addNoteToDraft;
