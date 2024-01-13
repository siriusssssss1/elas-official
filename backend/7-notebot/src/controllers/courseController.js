const courseModel = require("../models/courseModel");
const noteModel = require("../models/noteModel");
const sectionModel = require("../models/sectionModel");
const widgetModel = require("../models/widgetModel");
const userModel = require("../models/userModel");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const { json } = require("body-parser");

//get all courses : test
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find();

    res.json({
      courses: courses.map((course) => course.toObject({ getters: true })),
    });
  } catch (err) {
    const error = new HttpError(
      "Fetching courses failed, please try again later.",
      500
    );
    return next(error);
  }
};

//Get courses by user_id
const getCoursesByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    const user = await userModel.findOne({uid: user_id}).populate("courses");
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Could not find user for the provided user id." });
    }

    const courses = user.courses.map((course) =>
      course.toObject({ getters: true })
    );

    // await Promise.all(
    //   courses.map((course) => {
    //     return noteModel
    //       .find({
    //         course_id: course._id,
    //       })
    //       .then((list) => {
    //         course.notes_count = list.length;
    //       });
    //   })
    // );

    res.json({
      courses,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "An error occurred while fetching courses.",
      500
    );
    return next(error);
  }
};

//Create a new course
const createCourse = async (req, res, next) => {
  const { title, user_id } = req.body;

  //let session; // Declare the session variable

  try {
    // Start a Mongoose session
    //session = await mongoose.startSession();
    //session.startTransaction();
    let course = new courseModel({
      title: title,
      user_id: user_id,
    });
    const savedCourse = await course.save();
    const course_id = savedCourse._id;

    await userModel.updateMany({uid: user_id}, {$push: {courses:course_id}});

    // Create the course
    // const createdCourse = await courseModel.create([{ user_id, title }], {
    //   session,
    // });
    // console.log("createdCourse", createdCourse);
    // // Assign the course to the user
    // await userModel.findByIdAndUpdate(
    //   user_id,
    //   { $push: { courses: createdCourse[0]._id } },
    //   { session }
    // );

    // Commit the transaction
    //await session.commitTransaction();

    res.status(201).json({ course: course });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error saving course to DB` });
    return;
    
  
    // Abort the transaction and roll back changes
    // if (session) {
    //   await session.abortTransaction();
    // }

  //   const httpError = new HttpError(
  //     `An error occurred while creating the course: ${error.message}`,
  //     500
  //   );
  //   return next(httpError);
  // } finally {

  //   console.log("finally")
  //   // End the session
  //   if (session) {
  //     session.endSession();
  //   }
  }
};

//delete course and its notes
const deleteCourseWithNotes = async (req, res, next) => {
  const { course_id } = req.params;


    try {
      const course = await courseModel.findByIdAndDelete(course_id);
      console.log(course);
      if (!course) {
        return res
          .status(404)
          .json({ message: "Could not find course for the provided id." });
      }

      const noteIds = course.notes;
      console.log(noteIds);
      for (const noteId of noteIds) {
        // Find and delete the note
        const note = await noteModel.findByIdAndDelete(noteId);
        

        if (note) {
        // Delete sections and widgets associated with the note
          const sectionIds = note.sections;
          console.log(sectionIds);

          for (const sectionId of sectionIds) {
          // Find and delete the section
            const section = await sectionModel.findByIdAndDelete(sectionId);

            if (section) {
            // Delete widgets associated with the section
              const widgetIds = section.widgets;
              console.log(widgetIds);

              for (const widgetId of widgetIds) {
                const widget = await widgetModel.findByIdAndDelete(widgetId);
            }
          }
        }
      }
    }
      // console.log(noteIds);
      // const note = await noteModel.findByIdAndDelete(noteIds);
    res.status(200).json({ message: "Course and associated notes deleted." });
    } catch (error) {
      console.log(err);
      const httpError = new HttpError(
        `An error occurred while deleting the course: ${error.message}`,
        500
      );
      return next(httpError);
    } 
};


exports.getAllCourses = getAllCourses;
exports.getCoursesByUserId = getCoursesByUserId;
exports.deleteCourseWithNotes = deleteCourseWithNotes;
exports.createCourse = createCourse;
