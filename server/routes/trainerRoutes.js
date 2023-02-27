import express from "express";
import { createTrainer, deleteTrainer, getTrainer, getTrainerById, updateTrainer } from "../controllers/trainerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTrainer);
router.route("/create").post(protect, createTrainer);
router.route("/:id").get(getTrainerById).put(protect, updateTrainer).delete(protect, deleteTrainer);

export default router;
