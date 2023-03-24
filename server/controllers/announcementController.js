import asyncHandler from "express-async-handler";
import Announcement from "../models/AnnouncementModel.js";

export const getAnnouncement = asyncHandler(async (req, res) => {
  const annoucements = await Announcement.find();
  res.json(annoucements);
});

export const createAnnouncement = asyncHandler(async (req, res) => {
  const { title, message } = req.body;

  const today = new Date();

  if (!title || !message) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const announcement = new Announcement({
      date: today,
      title,
      message,
    });
    const createdAnnouncement = await announcement.save();

    res.status(201).json(createdAnnouncement);
  }
});

export const deleteAnnoucement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (announcement) {
    await announcement.remove();
    res.json({ message: "Annoucement removed" });
  } else {
    res.status(404).json({ message: "Annoucement not found" });
  }
});