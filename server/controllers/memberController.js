import asyncHandler from "express-async-handler";
import Member from "../models/MemberModel.js";
import User from "../models/UserModel.js";

export const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "trainer",
      select: "_id",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .populate({
      path: "service",
      select: "name price",
    });
  res.json(members);
});

export const createMember = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    address,
    phoneNumber,
    dateOfRegistration,
    trainerId,
    serviceId,
    plan,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  if (
    !name ||
    !email ||
    !password ||
    !gender ||
    !address ||
    !phoneNumber ||
    !dateOfRegistration ||
    !trainerId ||
    !serviceId ||
    !plan
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const user = new User({ name, email, password, role: "member" });
    const createdUser = await user.save();

    const member = new Member({
      user: createdUser._id,
      gender,
      address,
      phoneNumber,
      dateOfRegistration,
      trainer: trainerId,
      service: serviceId,
      plan,
    });
    const createdMember = await member.save();

    res.status(201).json(createdMember);
  }
});

export const getMemberById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "trainer",
      select: "_id",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .populate({
      path: "service",
      select: "name price",
    });

  if (member) {
    res.json(member);
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

export const updateMember = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    gender,
    address,
    phoneNumber,
    trainerId,
    serviceId,
    plan,
  } = req.body;

  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   res.status(400);
  //   throw new Error("Email is already in use");
  // }

  const member = await Member.findById(req.params.id)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "trainer",
      select: "_id",
      populate: {
        path: "user",
        select: "name",
      },
    })
    .populate({
      path: "service",
      select: "name price",
    });

  if (member) {
    // Update the User model
    const user = await User.findById(member.user._id);
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    await user.save();

    // Update the Member model
    member.gender = gender || member.gender;
    member.address = address || member.address;
    member.phoneNumber = phoneNumber || member.phoneNumber;
    member.trainer = trainerId || member.trainer;
    member.service = serviceId || member.service;
    member.plan = plan || member.plan;

    const updatedMember = await member.save();
    res.json({ updatedMember });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});

export const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (member) {
    const user = await User.findById(member.user);
    if (user) {
      await user.remove();
    }
    await member.remove();
    res.json({ message: "Member removed" });
  } else {
    res.status(404).json({ message: "Member not found" });
  }
});
