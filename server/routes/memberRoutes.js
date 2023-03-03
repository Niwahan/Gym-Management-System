import express from "express";
import {
  createMember,
  deleteMember,
  getMemberById,
  getMembers,
  updateMember,
} from "../controllers/memberController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMembers);
router.route("/create").post(protect, createMember);
router
  .route("/:id")
  .get(getMemberById)
  .put(protect, updateMember)
  .delete(protect, deleteMember);

export default router;
