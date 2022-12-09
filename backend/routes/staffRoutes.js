import express from "express";
import {
  authStaff,
  getStaffProfile,
  registerStaff,
} from "../controllers/staffController.js";
import { protectStaff } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/api/studentdetails", (req, res) => {
//   res.json(studentDetails);
// });

router.post("/login", authStaff);
router.post("/register", registerStaff);
router.route("/myprofile").get(protectStaff, getStaffProfile);

export default router;
