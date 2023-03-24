import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";
import Member from "../models/MemberModel.js";
import Trainer from "../models/TrainerModel.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    let memberId;
    if (user.role === "member") {
      const member = await Member.findOne({ user: user._id });
      if (member) {
        memberId = member._id;
      }
    }
    let trainerId;
    if (user.role === "trainer") {
      const trainer = await Trainer.findOne({ user: user._id });
      if (trainer) {
        trainerId = trainer._id;
      }
    }
    res.json({
      _id: user._id,
      memberId,
      trainerId,
      name: user.name,
      email: user.email,
      role: user.role,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      role: user.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
