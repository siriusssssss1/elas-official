const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;

const db = {};

/***************** START: EXPORT SCHEMA AS MODULE *****************
 * @documentation
 * Export the schema as a module. This will allow you to import the
 * schema in other files.
 */
db.user = require("./userModel");
db.course = require("./courseModel");
db.draft = require("./draftModel");
db.note = require("./noteModel");
db.favoriteCourse = require("./favoriteCourseModel");
db.favoriteNote = require("./favoriteNoteModel");
db.section = require("./sectionModel");
db.widget = require("./widgetModel");
db.search = require("./searchModel");
/***************** END: EXPORT SCHEMA AS MODULE *****************/

module.exports = db;
