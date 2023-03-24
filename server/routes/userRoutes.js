import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import { registerUser, authUser, updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile)

export default router;
