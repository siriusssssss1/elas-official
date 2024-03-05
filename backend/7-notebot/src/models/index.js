const db = {};

/***************** START: EXPORT SCHEMA AS MODULE *****************
 * @documentation
 * Export the schema as a module. 
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
db.httpError = require("./http-error");
/***************** END: EXPORT SCHEMA AS MODULE *****************/

module.exports = db;
