const db = require("../models");
const Widget = db.widget;
const Section = db.section;
const HttpError = require("../models/http-error.js");
const mongoose = require("mongoose");

// Get widgets by section id
const getWidgetsBySectionId = async (req, res, next) => {
    const { section_id } = req.params;

    try {
        const section = await Section.findById(section_id).populate("Widget");

        if(!section) {
          return res.status(404).json({message: "Section not found."});
        }
    
        if (!section.widgets || section.widgets.length === 0) {
            return res.status(404).json({ message: "Section has no widgets." });
        }

        res.json({ widgets: section.widgets.map((widget) => widget.toObject({ getters: true })) });
    } catch (err) {
        const error = new HttpError("An error occurred while fetching widgets.", 500);
        return next(error);
    }
};

//Add a widget to a section
const addWidgetToSection = async (req, res, next) => {
    const { section_id } = req.params;
    const { type, data, layout_index } = req.body; 
  
    try {
      const section = await Section.findById(section_id);
  
      if (!section) {
        return res.status(404).json({ message: "Section not found." });
      }
  
      const widget = new Widget({
        type,
        data,
        layout_index,
        section_id: section._id,
      });
  
      await widget.save();
  
      section.widgets.push(widget._id);
      await section.save();
  
      res.json({ message: "Widget added to the section." });
    } catch (err) {
        console.log(err);
        const error = new HttpError("An error occurred while adding the widget to the section.", 500);
        return next(error);
    }
  };

// create widget
const createWidget = async (req, res, next) => {
  const { type, data, layout_index, section_id } = req.body;

  try {

    const createdWidget = new Widget({
      type,
      data,
      layout_index,
      section_id,
    });

    await createdWidget.save();

    res.status(201).json({ message: "Widget created!", widget: createdWidget });
  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while creating the widget.", 500);
    return next(error);
  }
};

//test
const getWidget = async (req, res, next) => {
  try {
    const widgets = await Widget.find();
    res.json({ widgets: widgets.map((widget) => widget.toObject({ getters: true })) });
  } catch (err) {
    const error = new HttpError(
      "An error occurred while fetching notes. ",
      500
    );
    console.log(err);
    return next(error);
  }
};

//delete widget from section
const deleteWidget = async (req, res, next) => { 
  const {section_id, widget_id} = req.params;

  try {
    const widget = await Widget.findById(widget_id);

    if (!widget) {
      return res
        .status(404)
        .json({ message: "Could not find widget for the provided id." });
    }
    try {
      await Widget.deleteOne({ _id: widget_id });

      const sectionID = new mongoose.Types.ObjectId(widget.section_id);
        await Section.updateMany(
          { _id: sectionID },
          {
            $pull: {
              widgets: widget_id,
            },
          },
          { new: true }
        );

      res.status(200).json({ message: "Widget deleted!" });
    } catch (error) {
      throw error;
    }
  } catch (err) {
  console.log(err);
    const error = new HttpError('An error occurred while deleting a section.', 500);
    return next(error);
  }
};

//update widget
const updateWidget = async (req, res, next) => {
    const { widget_id } = req.params;
    const { layout_index, data } = req.body;

    try {
        if (!layout_index || !data ) {
            return res.status(400).json({ message: "Invalid widget data." });
        }

        const widget = await Widget.findById(widget_id);

        if (!widget) {
            return res.status(404).json({ message: "Could not find widget for the provided id." });
        }

        widget.layout_index = layout_index;
        widget.data = data;
        
        await widget.save();

        res.status(200).json({ message: "Widget updated!", widget: widget.toObject({ getters: true }) });

    } catch (err) {
      console.log(err);
        const error = new HttpError('An error occurred while updating a widget.', 500);
        return next(error);
    }
};


    exports.getWidgetsBySectionId = getWidgetsBySectionId;
    exports.addWidgetToSection = addWidgetToSection;
    exports.createWidget = createWidget;
    exports.getWidget = getWidget;
    exports.deleteWidget = deleteWidget; 
    exports.updateWidget = updateWidget;