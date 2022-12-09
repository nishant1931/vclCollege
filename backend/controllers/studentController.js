import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import generateToken from "../utils/generateToken.js";

// REGISTER student and get token
// POST - api/student/register
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const studentExists = await Student.findOne({ email });

  if (studentExists) {
    res.status(404);
    throw new Error("User already exists!");
  }

  const student = await Student.create({ name, email, password });

  if (student) {
    res.status(201).json({
      _id: student._id,
      name: student.name,
      email: student.email,
      isStudent: student.isStudent,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("User not Found!");
  }
});

// GET ALL STUDENTS
// /api/student/allstudents  - PROTECT/ADMIN
const getAllStudents = asyncHandler(async (req, res) => {
  const users = await Student.find({});
  res.json(users);
});

// AUTH student and get token
// POST - api/student/login
// @access Public
const authStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (student && (await student.matchPassword(password))) {
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      mobile: null,
      isStudent: student.isStudent,
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// GET STUDENT PROFILE
// /api/student/myprofile
const getStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.student._id);

  if (student) {
    res.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      mobile: null,
      isStudent: student.isStudent,
    });
  } else {
    res.status(401);
    throw new Error("Staff member not found! ");
  }
});

// GET STUDENT DETAILS UPDATE
// /api/student/:id
const updateStudentDetail = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    student.mobile = req.body.mobile;
    student.resume = req.body.resume;

    const updatedStudentDetail = await student.save();

    res.json({
      _id: updatedStudentDetail._id,
      name: updatedStudentDetail.name,
      email: updatedStudentDetail.email,
      mobile: updatedStudentDetail.mobile,
      resume: updatedStudentDetail.resume,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  registerStudent,
  authStudent,
  getStudentProfile,
  getAllStudents,
  updateStudentDetail,
};
