import express from "express";
import {
  getEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipmentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getEquipment);
router.route("/create").post(protect, createEquipment);
router
  .route("/:id")
  .get(getEquipmentById)
  .put(protect, updateEquipment)
  .delete(protect, deleteEquipment);

export default router;
