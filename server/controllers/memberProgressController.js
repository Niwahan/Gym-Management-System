import asyncHandler from "express-async-handler";
import Member from "../models/MemberModel.js";

export const updateProgress = asyncHandler(async (req, res) => {
  const { initialWeight, finalWeight, initialBodyType, finalBodyType } =
    req.body;

  const member = await Member.findById(req.params.id)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "service",
      select: "name",
    });
  if (member) {
    // Update the Member model
    member.initialWeight = initialWeight || member.initialWeight;
    member.finalWeight = finalWeight || member.finalWeight;
    member.initialBodyType = initialBodyType || member.initialBodyType;
    member.finalBodyType = finalBodyType || member.finalBodyType;

    const updatedMemberProgress = await member.save();
    res.json({ updatedMemberProgress });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});
