import express from "express";
import {
  authStudent,
  getAllStudents,
  getStudentProfile,
  registerStudent,
  updateStudentDetail,
} from "../controllers/studentController.js";
import {
  protectStaff,
  protectStudent,
  staffMember,
} from "../middlewares/authMiddleware.js";
const router = express.Router();

// router.get("/api/studentdetails", (req, res) => {
//   res.json(studentDetails);
// });

router.post("/login", authStudent);
router.post("/register", registerStudent);
router.route("/myprofile").get(protectStudent, getStudentProfile);
router.route("/:id").patch(protectStudent, updateStudentDetail);
router.route("/allstudents").get(protectStaff, staffMember, getAllStudents);

export default router;
