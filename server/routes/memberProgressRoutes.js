import express from "express";
import { updateProgress } from "../controllers/memberProgressController.js";

const router = express.Router();
router.route("/:id").put(updateProgress);

export default router;