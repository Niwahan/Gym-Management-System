import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import Trainer from "../models/TrainerModel.js";

export const getTrainer = asyncHandler(async (req, res) => {
  const trainers = await Trainer.find().populate("user", "name email");
  res.json(trainers);
});

export const createTrainer = asyncHandler(async (req, res) => {
  const { name, email, password, address, phoneNumber, experience } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email is already in use");
  }

  if (!name || !email || !password || !address || !phoneNumber || !experience) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const user = new User({ name, email, password, role: "trainer" });
    const createdUser = await user.save();

    const trainer = new Trainer({
      user: createdUser._id,
      address,
      phoneNumber,
      experience,
    });
    const createdTrainer = await trainer.save();

    res.status(201).json(createdTrainer);
  }
});

export const getTrainerById = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (trainer) {
    res.json(trainer);
  } else {
    res.status(404).json({ message: "Trainer not found" });
  }
});

export const updateTrainer = asyncHandler(async (req, res) => {
  const { name, email, address, phoneNumber, experience } = req.body;

  const trainer = await Trainer.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (trainer) {
    const user = await User.findById(trainer.user._id);
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    await user.save();

    trainer.address = address || trainer.address;
    trainer.phoneNumber = phoneNumber || trainer.phoneNumber;
    trainer.experience = experience || trainer.experience;

    const updatedTrainer = await trainer.save();
    res.json({ updatedTrainer });
  } else {
    res.status(404).json({ message: "Trainer not found" });
  }
});

export const deleteTrainer = asyncHandler(async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);

  if (trainer) {
    const user = await User.findById(trainer.user);
    if (user) {
      await user.remove();
    }
    await trainer.remove();
    res.json({ message: "Trainer removed" });
  } else {
    res.status(404).json({ message: "Trainer not found" });
  }
});
