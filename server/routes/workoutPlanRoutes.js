import express from "express";
import {
  createWorkoutPlan,
  getWorkoutPlans,
  getWorkoutPlanById,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} from "../controllers/workoutPlanController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:memberId").post(protect, createWorkoutPlan);

router.route("/:memberId").get(getWorkoutPlans);

router.route("/:memberId/:workoutId").get(protect, getWorkoutPlanById);

router.route("/:memberId/:workoutId").put(protect, updateWorkoutPlan);

router.route("/:memberId/:workoutId").delete(protect, deleteWorkoutPlan);

export default router;
