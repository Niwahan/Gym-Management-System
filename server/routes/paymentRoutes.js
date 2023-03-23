import express from "express";
import { createPayment } from "../controllers/paymentController.js";

const router = express.Router();
router.route("/:id").post(createPayment);

export default router;
