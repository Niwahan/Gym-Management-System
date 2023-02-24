import asyncHandler from "express-async-handler";
import Member from "../models/Member.js";

export const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();
  res.json(members);
});
