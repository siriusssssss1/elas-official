//handle operations related to widgets (and sections)
const widgetModel = require("../model/widgetModel.js"); //import modules
const sectionModel = require("../model/sectionModel.js");
const HttpError = require("../model/http-error.js"); // handling http errors

// Get widgets by section id, function handles GET request to fetch wigets associated with specific section
const getWidgetsBySectionId = async (req, res, next) => {
    const { section_id } = req.params;

    try {
        const section = await sectionModel.findById(section_id).populate("widgets"); // find right section
    
        if (!section.widgets || section.widgets.length === 0) {
            return res.status(404).json({ message: "Section not found." }); // error message
        }

        res.json({ widgets: section.widgets.map((widget) => widget.toObject({ getters: true })) }); //show right widget
    } catch (err) {
        const error = new HttpError("An error occurred while fetching widgets.", 500); // error auffangen
        return next(error);
    }
};



//Add a widget to a section, POST request to add widget to specific section, extracts section ID and widget details from request body
const addWidgetToSection = async (req, res, next) => {
    const { section_id } = req.params;
    const { type, data } = req.body; // Assuming the type and data for the widget are available in the request body
  
    try {
      const section = await sectionModel.findById(section_id);
  
      if (!section) {
        return res.status(404).json({ message: "Section not found." }); // error ausgeben
      }
  
      // Create a new widget object
      const widget = new widgetModel({
        type,
        data,
        section_id: section._id,
      });
  
      // Save the new widget
      await widget.save();
  
      // Update the section's widgets array with the newly created widget
      section.widgets.push(widget._id);
      await section.save();
  
      res.json({ message: "Widget added to the section." });
    } catch (err) {
        const error = new HttpError("An error occurred while adding the widget to the section.", 500); // error auffangen
        return next(error);
    }
  };

// create widget, POST request to create new widget, t extracts widget details from the request body, validates input, creates a new widget using the widgetModel, saves it, and sends a JSON response confirming the creation.
const createWidget = async (req, res, next) => {
  const { type, data, section_id } = req.body;

  try {
    // Input validation and error handling...

    const createdWidget = new widgetModel({
      type,
      data,
      section_id,
    });

    await createdWidget.save();

    res.status(201).json({ message: "Widget created!", widget: createdWidget });
  } catch (err) {
    const error = new HttpError("An error occurred while creating the widget.", 500);
    return next(error);
  }
};

    //delete widget from section
    //const deleteWidget = async (req, res, next) => { ... }

    //update widget
    //const updateWidget = async (req, res, next) => { ... }

    //change widget

    //export functions to make them available for use in other parts of application
    exports.getWidgetsBySectionId = getWidgetsBySectionId; 
    exports.addWidgetToSection = addWidgetToSection;
    exports.createWidget = createWidget;