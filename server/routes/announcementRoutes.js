import express from "express";
import { createAnnouncement, deleteAnnoucement, getAnnouncement } from "../controllers/announcementController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getAnnouncement);
router.route("/create").post(protect, createAnnouncement);
router
  .route("/:id")
  .delete(protect, deleteAnnoucement);

export default router;
