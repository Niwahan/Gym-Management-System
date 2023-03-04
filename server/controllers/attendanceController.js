import asyncHandler from "express-async-handler";
import Member from "../models/MemberModel.js";

export const takeAttendance = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const currentDate = new Date().toISOString().split("T")[0]; // get current date in yyyy-mm-dd format

  try {
    const member = await Member.findById(_id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    const existingAttendance = member.attendance.find(
      (date) => date.toISOString().split("T")[0] === currentDate
    );
    if (existingAttendance) {
      return res
        .status(400)
        .json({ message: "Attendance already taken for today" });
    }
    member.attendance.push(new Date());
    await member.save();

    return res.status(200).json({ message: "Member checked in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});
