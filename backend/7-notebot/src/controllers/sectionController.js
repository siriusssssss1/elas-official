const db = require("../models");
const mongoose = require("mongoose");
const Section = db.section;
const Note = db.note;
const Widget = db.widget;
const HttpError = db.httpError;

// Test route to get all sections.
const getSections = async (req, res, next) => {
  try {
    const sections = await Section.find();

    res.json({ sections: sections.map((section) => section.toObject({ getters: true })) });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching sections. ", 500);
    return next(error);
  }
};

// Retrieve sections belonging to a note by its ID. - See sections while creating a note.
const getSectionsByNoteId = async (req, res, next) => {
  const { note_id } = req.params;

  try {
    const note = await Note.findById(note_id).populate('sections');

    if (!note.sections || note.sections.length === 0) {
      return res.status(404).json({ message: "Could not find sections for the provided note id." });
    }

    res.json({ sections: note.sections.map(section => section.toObject({ getters: true })) });

  } catch (err) {
    console.log(err); 
    const error = new HttpError('An error occurred while fetching sections.', 500);
    return next(error);
  }
};

// Create a new section for a note. - Clicking on Add Section Button.
const createSection = async (req, res, next) => {
  const { note_id } = req.body;
  
  try {
    const createdSection = new Section({
      note_id,
      widgets: [],
    });
  
    await createdSection.save();
  
    res.status(201).json({ message: "Section created!", section: createdSection });

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while creating a section.', 500);
    return next(error);
  }
};

// Add widgets to a section. 
const pushWidgetsToSection = async (req, res, next) => {
  const { section_id, widget_ids } = req.body;
  
  try {
    if (!section_id || !Array.isArray(widget_ids)) {
      return res.status(400).json({ message: "Invalid request data." });
    }
  
    const section = await Section.findById(section_id);
    if (!section) {
      return res.status(404).json({ message: "Section not found." });
    }
  
    section.widgets.push(...widget_ids);
    await section.save();
  
    res.status(200).json({ message: "Widgets added to section.", section });

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while adding widgets to a section.', 500);
    return next(error);
  }
};
  
// Update a section with new layout field data.
const updateSection = async (req, res, next) => {
  const { section_id } = req.params;
  const { layout_field } = req.body;

  try {
    if (!layout_field) {
      return res.status(400).json({ message: "Invalid section data." });
    }

    const section = await Section.findById(section_id);

    if (!section) {
    return res.status(404).json({ message: "Could not find section for the provided id." });
    }

    section.layout_field = layout_field;

    await section.save();

    res.status(200).json({ message: "Section updated!", section: section.toObject({ getters: true }) });

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while updating a section.', 500);
    return next(error);
  }
};

// Add a section to a note. - Clicking on Add Section Button while creating a note.
const addSectionToNote = async (req, res, next) => {
  const { note_id } = req.params;
  const { layout_field } = req.body; 

  try {
    const note = await Note.findById(note_id);

    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }

    const section = new Section({
      layout_field,
      note_id: note._id,
      widgets: [],
    });

    await section.save();

    note.sections.push(section._id);
    await note.save();

    res.json({ message: "Section added to the note." });
    
  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while adding a section to a note.', 500);
    return next(error);
  }
};

// Update widgets for a section. 
const updateSectionWidgets = async (req, res, next) => {
  const { section_id } = req.params;
  const { widgets } = req.body;

  try {
    if (!widgets) {
      return res.status(400).json({ message: "Invalid section data." });
    }

    const section = await Section.findById(section_id);

    if (!section) {
      return res.status(404).json({ message: "Could not find section for the provided id." });
    }

    section.widgets = widgets;

    await section.save();

    res.status(200).json({ message: "Section updated!", section: section.toObject({ getters: true }) });

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while updating widgets for a section.', 500);
    return next(error);
  }
};

// Delete a section and its widgets - Clicking on the "x" Button above the section.
const deleteSection = async (req, res, next) => {
  const { section_id } = req.params;

  try {
    const section = await Section.findByIdAndDelete(section_id);
        
    if (!section) {
      return res.status(404).json({ message: "Could not find section for the provided id." });
    }

    const noteID = new mongoose.Types.ObjectId(section.note_id);

    await Note.updateMany(
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
      const widget = await Widget.findByIdAndDelete(widgetId);
    }  

    res.status(200).json({ message: "Section deleted!" });

  } catch (err) {
    console.log(err);
    const error = new HttpError('An error occurred while deleting a section.', 500);
    return next(error);
  }
};


exports.getSections = getSections;
exports.getSectionsByNoteId = getSectionsByNoteId;
exports.createSection = createSection;
exports.pushWidgetsToSection = pushWidgetsToSection;
exports.updateSection = updateSection;
exports.addSectionToNote = addSectionToNote;
exports.updateSectionWidgets = updateSectionWidgets;
exports.deleteSection = deleteSection;



