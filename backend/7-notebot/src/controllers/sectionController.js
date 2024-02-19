const sectionModel = require('../models/sectionModel')
const noteModel = require('../models/noteModel');
const widgetModel = require('../models/widgetModel');
const HttpError = require('../models/http-error');
const mongoose = require("mongoose");

// Get sections by note id
const getSectionsByNoteId = async (req, res, next) => {
    const { note_id } = req.params;

    try {
       const note = await noteModel.findById(note_id).populate('sections');

         if (!note.sections || note.sections.length === 0) {
            return res.status(404).json({ message: "Could not find sections for the provided note id." });
        }

        res.json({ sections: note.sections.map(section => section.toObject({ getters: true })) });
    } catch (err) {
        const error = new HttpError('An error occurred while fetching sections.', 500);
        return next(error);
    }
};


// Creat a new section with empty widgets
// const createSection = async (req, res, next) => {
//     const { note_id, layout_field } = req.body;

//     try {
//         // Input validation
//         if (!note_id || !layout_field) {
//             return res.status(400).json({ message: "Invalid section data." });
//         }

//         const note = await noteModel.findById(note_id);

//         if (!note) {
//             return res.status(404).json({ message: "Could not find note for the provided id." });
//         }

//         const session = await mongoose.startSession();
//         session.startTransaction();

//         try {
//             const createdSection = new sectionModel({
//                 layout_field,
//                 note_id,
//                 widgets: [], // Empty widgets array
//             });

//             await createdSection.save({ session });
            
//             // Add the section to the note's sections array
//             note.sections.push(createdSection);
//             await note.save({ session });

//             await session.commitTransaction();

//             res.status(201).json({ message: "Section created!", section: createdSection });
//         } catch (error) {
//             await session.abortTransaction();
//             throw error;
//         } finally
//         {
//             session.endSession();
//         }
//     } catch (err) {
//         const error = new HttpError('An error occurred while creating a section.', 500);
//         return next(error);
//     }
// };

const createSection = async (req, res, next) => {
    const { note_id } = req.body;
  
    try {
      // Input validation and error handling...
  
      const createdSection = new sectionModel({
        note_id,
        widgets: [],
      });
  
      await createdSection.save();
  
      res.status(201).json({ message: "Section created!", section: createdSection });
    } catch (err) {
        const error = new HttpError('An error occurred while creating a section.', 500);
        return next(error);
    }
  };

  //put widgets in a section
  const pushWidgetsToSection = async (req, res, next) => {
    const { section_id, widget_ids } = req.body;
  
    try {
      // Input validation and error handling...
      if (!section_id || !Array.isArray(widget_ids)) {
        return res.status(400).json({ message: "Invalid request data." });
      }
  
      const section = await sectionModel.findById(section_id);
      if (!section) {
        return res.status(404).json({ message: "Section not found." });
      }
  
      section.widgets.push(...widget_ids);
      await section.save();
  
      res.status(200).json({ message: "Widgets added to section.", section });
    } catch (err) {
      const error = new HttpError('An error occurred while adding widgets to a section.', 500);
      return next(error);
    }
  };
  
  
// Update a section
const updateSection = async (req, res, next) => {
    const { section_id } = req.params;
    const { layout_field } = req.body;
    console.log(section_id);

    try {
        // Input validation
        if (!layout_field) {
            return res.status(400).json({ message: "Invalid section data." });
        }

        const section = await sectionModel.findById(section_id);

        if (!section) {
            return res.status(404).json({ message: "Could not find section for the provided id." });
        }

        section.layout_field = layout_field;

        await section.save();

        res.status(200).json({ message: "Section updated!", section: section.toObject({ getters: true }) });

    } catch (err) {
        const error = new HttpError('An error occurred while updating a section.', 500);
        return next(error);
    }
};

//update a section's widgets
const updateSectionWidgets = async (req, res, next) => {
    const { section_id } = req.params;
    const { widgets } = req.body;

    try {
        // Input validation
        if (!widgets) {
            return res.status(400).json({ message: "Invalid section data." });
        }

        const section = await sectionModel.findById(section_id);

        if (!section) {
            return res.status(404).json({ message: "Could not find section for the provided id." });
        }

        section.widgets = widgets;

        await section.save();

        res.status(200).json({ message: "Section updated!", section: section.toObject({ getters: true }) });

    } catch (err) {
        const error = new HttpError('An error occurred while updating a section.', 500);
        return next(error);
    }
};


// Delete a section and its widgets
const deleteSection = async (req, res, next) => {
    const { section_id } = req.params;

    try {
        const section = await sectionModel.findByIdAndDelete(section_id);
        
        if (!section) {
            return res.status(404).json({ message: "Could not find section for the provided id." });
        }

        const noteID = new mongoose.Types.ObjectId(section.note_id);
        await noteModel.updateMany(
          { _id: noteID },
          {
            $pull: {
              sections: section_id,
            },
          },
          { new: true }
        );

        const widgetIds = section.widgets;
        for (const widgetId of widgetIds) {
          const widget = await widgetModel.findByIdAndDelete(widgetId);
        }  

            res.status(200).json({ message: "Section deleted!" });
    } catch (err) {
      console.log(err);
        const error = new HttpError('An error occurred while deleting a section.', 500);
        return next(error);
    }

};

//Add a section to a note
const addSectionToNote = async (req, res, next) => {
    const { note_id } = req.params;
  const { layout_field } = req.body; // Assuming the layout field and widgets are available in the request body

  try {
    const note = await noteModel.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    // Create a new section object
    const section = new sectionModel({
      layout_field,
      note_id: note._id,
      widgets: [],
    });

    // Save the new section
    await section.save();

    // Update the note's sections array with the newly created section
    note.sections.push(section._id);
    await note.save();

    res.json({ message: "Section added to the note." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add section to the note." });
  }
};

//get all sections
const getSections = async (req, res, next) => {
  try {
    const sections = await sectionModel.find();
    res.json({ sections: sections.map((section) => section.toObject({ getters: true })) });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    return next(error);
  }
};
  

exports.getSectionsByNoteId = getSectionsByNoteId;
exports.createSection = createSection;
exports.updateSection = updateSection;
exports.updateSectionWidgets = updateSectionWidgets;
exports.deleteSection = deleteSection;
exports.addSectionToNote = addSectionToNote;
exports.pushWidgetsToSection = pushWidgetsToSection;

exports.getSections = getSections;
