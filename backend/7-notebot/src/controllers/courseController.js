const courseModel = require("../models/courseModel");
const noteModel = require("../models/noteModel");
const userModel = require("../models/user.model");
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
  const user_id = req.body.userId;

  try {
    const user = await userModel.findById(user_id).populate("courses");

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
    const error = new HttpError(
      "An error occurred while fetching courses.",
      500
    );
    return next(error);
  }
};

//Create a new course
const createCourse = async (req, res, next) => {
  console.log("a")
  const { title } = req.body;
  console.log("b")
  console.log(req.userData)
  const user_id = req.body.user_id;
  console.log(req.body);
  console.log("c")

  //let session; // Declare the session variable

  try {
    console.log("try")
    // Start a Mongoose session
    //session = await mongoose.startSession();
    //session.startTransaction();
    let course = new courseModel({
      user_id: req.body.user_id,
      title: req.body.title,
    });
    console.log("new");
    await course.save();
    console.log("save");
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

  // try {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();

    try {
      const course = await courseModel.findById(course_id);

      if (!course) {
        return res
          .status(404)
          .json({ message: "Could not find course for the provided id." });
      }

      const noteIds = course.notes;
      console.log(noteIds);
      // Delete the course and its associated notes
      // await Promise.all([
      //   courseModel.findByIdAndDelete(course_id, { session }),
      //   noteModel.deleteMany({ course_id: course_id }, { session }),
      // ]);

      //await session.commitTransaction();

      res.status(200).json({ message: "Course and associated notes deleted." });
    } catch (error) {
      console.log(error);
      // await session.abortTransaction();
      const httpError = new HttpError(
        `An error occurred while deleting the course: ${error.message}`,
        500
      );
      return next(httpError);
     } //finally {
    //   session.endSession();
    }
  //   catch (err) {
  //   const error = new HttpError(
  //     "Deleting course failed, please try again later.",
  //     500
  //   );
  //   return next(error);
  // }
//};

exports.getAllCourses = getAllCourses;
exports.getCoursesByUserId = getCoursesByUserId;
exports.deleteCourseWithNotes = deleteCourseWithNotes;
exports.createCourse = createCourse;
