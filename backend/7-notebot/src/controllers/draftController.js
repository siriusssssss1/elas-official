const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const noteModel = require("../models/noteModel");
const draftModel = require("../models/draftModel");


const getDraftByUserId = async (req, res, next) => {
    const user_id = req.params.user_id;
    
    try {
  
      let drafts = await draftModel.find({
        user_id: user_id,
        //isDraft: true
      });
      console.log(drafts);
  
      const notes = await noteModel.find({
        _id: { $in: drafts.map((draft) => draft.note_id) },
      });

      console.log(notes);

  
      res.json({
        notes: notes.map((note) => ({
          ...note._doc,
          isDraft: true,
          isPublic: false
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

// const addNoteToDraft =  async (req, res) => {
//   const note_id = req.params.note_id;
//   const user_id = req.params.user_id;

//   const payload = {
//     note_id: note_id,
//     user_id: user_id,
//   };

//   console.log(note_id);
//   try {

//     const draft = await draftModel.findOne(payload);

//     const note = await noteModel.findOne({_id:note_id});


//     draft.note_id.push(note._id);
//     await draft.save();

//     await note.save();

//     res.json({ message: "Note added to drafts." });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Failed to add note to drafts." });
//   }
// };

const addNoteToDraft = async (req, res) => {
  const { note_id, user_id } = req.body;

  const payload = {
    note_id: note_id,
    user_id: user_id,
  };

  try {
    // Find the existing note
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    // // Create a draft from the existing note, including user_id
    // const draft = new noteModel({
    //   title: note.title,
    //   isPublic: false,
    //   user_id: user_id,
    //   isDraft: true,
    //   sections: note.sections
    // });
    // const newDraft = await draft.save();
    // res.status(201).json(newDraft);
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

  } catch (error) {
    res.status(400).json({ message: error.message });
  }};

// const updateDraft = async(req, res) => {
//   try {
//     const note_id = req.params.id;
//     const course_id = req.body;

//     let updatedNote;

//     if (course_id) {
//       // Move to a course
//       updatedNote = await noteModel.findByIdAndUpdate(
//         note_id,
//         { $set: { note_id, course: course_id } },
//         { new: true }
//       );
//       console.log(updatedNote);
//       await draftModel.findOneAndDelete({ note_id: note_id });

//     } else {
//       // Update the draft
//       updatedNote = await noteModel.findByIdAndUpdate(
//         note_id,
//         { $set: { title } },
//         { new: true }
//       );
//     }

//     // // Delete the corresponding draft after moving to a course or updating
//     // if (updatedNote.isDraft) {
//     //   await draftModel.findOneAndDelete({ note_id: note_id });
//     // }

//     res.json(updatedNote);
    
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

 

  exports.getDraftByUserId = getDraftByUserId;
  exports.addNoteToDraft = addNoteToDraft;
  //exports.updateDraft = updateDraft;