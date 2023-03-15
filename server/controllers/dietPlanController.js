import asyncHandler from "express-async-handler";
import Member from "../models/MemberModel.js";

export const createDietPlan = asyncHandler(async (req, res) => {
  const { title, date, meals } = req.body;

  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const newDiet = {
    title,
    date,
    meals,
  };

  member.dietPlan.push(newDiet);

  const updatedMember = await member.save();

  res
    .status(201)
    .json(updatedMember.dietPlan[updatedMember.dietPlan.length - 1]);
});

export const getDietPlans = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  res.json(member.dietPlan);
});

export const getDietPlanById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const diet = member.dietPlan.find(
    (d) => d._id.toString() === req.params.dietId
  );

  if (!diet) {
    res.status(404);
    throw new Error("Diet plan not found");
  }

  res.json(diet);
});

export const updateDietPlan = asyncHandler(async (req, res) => {
  const { title, date, meals } = req.body;

  const member = await Member.findById(req.params.memberId);

  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const dietIndex = member.dietPlan.findIndex(
    (d) => d._id.toString() === req.params.dietId
  );

  if (dietIndex === -1) {
    res.status(404);
    throw new Error("Diet plan not found");
  }

  member.dietPlan[dietIndex].title = title || member.dietPlan[dietIndex].title;
  member.dietPlan[dietIndex].date = date || member.dietPlan[dietIndex].date;
  member.dietPlan[dietIndex].meals = meals || member.dietPlan[dietIndex].meals;

  const updatedMember = await member.save();

  res.json(updatedMember.dietPlan[dietIndex]);
});

export const deleteDietPlan = asyncHandler(async (req, res) => {
  const { memberId, dietId } = req.params;

  const member = await Member.findById(memberId);
  if (!member) {
    res.status(404);
    throw new Error("Member not found");
  }

  const dietPlan = member.dietPlan.find((d) => d._id.toString() === dietId);
  if (!dietPlan) {
    res.status(404);
    throw new Error("Diet plan not found");
  }

  member.dietPlan = member.dietPlan.filter((d) => d._id.toString() !== dietId);
  await member.save();

  res.json({ message: "Diet plan removed" });
});
