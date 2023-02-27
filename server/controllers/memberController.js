import asyncHandler from "express-async-handler";
import Member from "../models/Member.js";

export const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find({ user: req.user._id });
  res.json(members);
});

export const createMember = asyncHandler(async (req, res) => {
  // const { title, content, category } = req.body;
});
