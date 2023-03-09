import asyncHandler from "express-async-handler";
import Member from "../models/MemberModel.js";

export const createWorkoutPlan = asyncHandler(async (req, res) => {
  const { title, date, exercises } = req.body;

  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const newWorkout = {
    title,
    date,
    exercises,
  };

  member.workoutPlan.push(newWorkout);

  const updatedMember = await member.save();

  res
    .status(201)
    .json(updatedMember.workoutPlan[updatedMember.workoutPlan.length - 1]);
});

export const getWorkoutPlans = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  res.json(member.workoutPlan);
});

export const getWorkoutPlanById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const workout = member.workoutPlan.find(
    (w) => w._id.toString() === req.params.workoutId
  );

  if (!workout) {
    res.status(404);
    throw new Error("Workout plan not found");
  }

  res.json(workout);
});

export const updateWorkoutPlan = asyncHandler(async (req, res) => {
  const { title, date, exercises } = req.body;

  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const workoutIndex = member.workoutPlan.findIndex(
    (w) => w._id.toString() === req.params.workoutId
  );

  if (workoutIndex === -1) {
    res.status(404);
    throw new Error("Workout plan not found");
  }

  member.workoutPlan[workoutIndex].title =
    title || member.workoutPlan[workoutIndex].title;
  member.workoutPlan[workoutIndex].date =
    date || member.workoutPlan[workoutIndex].date;
  member.workoutPlan[workoutIndex].exercises =
    exercises || member.workoutPlan[workoutIndex].exercises;

  const updatedMember = await member.save();

  res.json(updatedMember.workoutPlan[workoutIndex]);
});

export const deleteWorkoutPlan = asyncHandler(async (req, res) => {
  const { memberId, workoutId } = req.params;

  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const workoutPlan = member.workoutPlan.find(
    (w) => w._id.toString() === workoutId
  );
  if (!workoutPlan) {
    res.status(404);
    throw new Error("Workout plan not found");
  }

  member.workoutPlan = member.workoutPlan.filter(
    (w) => w._id.toString() !== workoutId
  );
  await member.save();

  res.json({ message: "Workout plan removed" });
});
