import express from "express";
import {
  createDietPlan,
  getDietPlans,
  getDietPlanById,
  updateDietPlan,
  deleteDietPlan,
} from "../controllers/dietPlanController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:memberId").post(protect, createDietPlan);

router.route("/:memberId").get(getDietPlans);

router.route("/:memberId/:dietId").get(protect, getDietPlanById);

router.route("/:memberId/:dietId").put(protect, updateDietPlan);

router.route("/:memberId/:dietId").delete(protect, deleteDietPlan);

export default router;
