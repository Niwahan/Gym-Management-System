import express from "express";
import { getMembers } from "../controllers/memberController.js";

const router = express.Router();

router.route("/").get(getMembers);
// router.route("/create").post();
// router.route("/:id").get().put().delete();

export default router;
