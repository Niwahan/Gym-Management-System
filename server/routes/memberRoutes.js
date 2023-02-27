import express from "express";
import { getMembers } from "../controllers/memberController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getMembers);
// router.route("/create").post(createMember);
// router.route("/:id").get().put().delete();

export default router;
