import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import Student from "../models/studentModel.js";

const protectStudent = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

      req.student = await Student.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

const protectStaff = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);

      req.staff = await Staff.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized, Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

const staffMember = (req, res, next) => {
  if (req.staff && req.staff.isStaffMember) {
    next();
  } else {
    res.status(401);
    throw new Error("You are not authorized");
  }
};

export { protectStudent, protectStaff, staffMember };
