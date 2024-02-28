const db = require("../models");
const Course = db.course;
const Note = db.note;
const Section = db.section;
const Widget = db.widget;
const User = db.user;
const HttpError = db.httpError;

// Test route to get all courses.
const getAllCourses = async ( res, next) => {

  try {
    const courses = await Course.find();

    res.json({
      courses: courses.map((course) => course.toObject({ getters: true })),
    });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occures while fetching courses.", 500);
    return next(error);
  }
};

// Get courses by user ID - Courses page (Grid view): when clicking on Courses in the Dashboard page.
const getCoursesByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const user = await User.findOne({uid: user_id}).populate("courses");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided user id." });
    }

    const courses = user.courses.map((course) =>
      course.toObject({ getters: true })
    );

    res.json({
      courses,
    });

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while fetching courses.", 500);
    return next(error);
  }
};

// Create course - AddCourse button in the Dashboard page.
const createCourse = async (req, res) => {
  const { title, user_id } = req.body;

  try {
    let course = new Course({
      title: title,
      user_id: user_id,
    });

    const savedCourse = await course.save();
    const course_id = savedCourse._id;

    await User.updateMany({uid: user_id}, {$push: {courses:course_id}});

    res.status(201).json({ course: course });
    return;

  } catch (err) {
    console.log(err);
    const error = new HttpError("An error occurred while creating a course.", 500);
    return next(error);
  }
};

// Delete course with notes - Clicking on the delete icon in the Courses page.
const deleteCourseWithNotes = async (req, res, next) => {
  const { course_id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(course_id);
    if (!course) {
      return res
        .status(404)
        .json({ message: "Could not find course for the provided id." });
    }

    const noteIds = course.notes;
    for (const noteId of noteIds) {
      const note = await Note.findByIdAndDelete(noteId);
      if (note) {
        const sectionIds = note.sections;
        for (const sectionId of sectionIds) {
          const section = await Section.findByIdAndDelete(sectionId);
          if (section) {
            const widgetIds = section.widgets;
            for (const widgetId of widgetIds) {
              const widget = await Widget.findByIdAndDelete(widgetId);
            }
          }
        }
      }
    }

    await User.updateMany(
      {uid: course.user_id},
      {
        $pull: {
          courses: course_id,
          notes: { $in: noteIds },
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Course and associated notes deleted." });

    } catch (error) {
      console.log(err);
      const httpError = new HttpError('An error occurred while deleting a course', 500);
      return next(httpError);
    } 
};


exports.getAllCourses = getAllCourses;
exports.getCoursesByUserId = getCoursesByUserId;
exports.createCourse = createCourse;
exports.deleteCourseWithNotes = deleteCourseWithNotes;

