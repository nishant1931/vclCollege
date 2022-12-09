import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";
import generateToken from "../utils/generateToken.js";

// REGISTER staff and get token
// POST - api/staff/register
const registerStaff = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const staffExists = await Staff.findOne({ email });

  if (staffExists) {
    res.status(404);
    throw new Error("User already exists!");
  }

  const staff = await Staff.create({ name, email, password });

  if (staff) {
    res.status(201).json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      isStaffMember: staff.isStaffMember,
      token: generateToken(staff._id),
    });
  } else {
    res.status(400);
    throw new Error("User not Found!");
  }
});

// AUTH STAFF and get token
// POST - api/staff/login
// @access Public
const authStaff = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const staff = await Staff.findOne({ email });

  if (staff && (await staff.matchPassword(password))) {
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      isStaffMember: staff.isStaffMember,
      token: generateToken(staff._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// GET staff PROFILE
// /api/student/myprofile
const getStaffProfile = asyncHandler(async (req, res) => {
  const staff = await Staff.findById(req.staff._id);

  if (staff) {
    res.json({
      _id: staff._id,
      name: staff.name,
      email: staff.email,
      mobile: null,
      isStaffMember: staff.isStaffMember,
    });
  } else {
    res.status(401);
    throw new Error("User not found! ");
  }
});

export { registerStaff, authStaff, getStaffProfile };
