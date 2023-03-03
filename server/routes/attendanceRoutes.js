import express from "express";
import { takeAttendance } from "../controllers/attendanceController.js";

const router = express.Router();
router.route("/checkin").put(takeAttendance);

export default router;