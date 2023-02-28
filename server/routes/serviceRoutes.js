import express from "express";
import {
  getService,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getService);
router.route("/create").post(protect, createService);
router
  .route("/:id")
  .get(getServiceById)
  .put(protect, updateService)
  .delete(protect, deleteService);

export default router;
