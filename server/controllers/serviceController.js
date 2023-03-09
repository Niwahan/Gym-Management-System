import asyncHandler from "express-async-handler";
import Service from "../models/ServiceModel.js";

export const getService = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

export const createService = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  const serviceExists = await Service.findOne({ name });

  if (serviceExists) {
    res.status(400);
    throw new Error("Service already exists");
  }

  if (!name || !description || !price) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const service = new Service({ name, description, price });
    const createdService = await service.save();

    res.status(201).json(createdService);
  }
});

export const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ message: "Service not found" });
  }
});

export const updateService = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;

  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   res.status(400);
  //   throw new Error("Email is already in use");
  // }

  const service = await Service.findById(req.params.id);

  if (service) {
    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;

    const updatedService = await service.save();
    res.json({ updatedService });
  } else {
    res.status(404).json({ message: "Service not found" });
  }
});

export const deleteEquipment = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findById(req.params.id);

  if (equipment) {
    await equipment.remove();
    res.json({ message: "Equipment removed" });
  } else {
    res.status(404).json({ message: "Equipment not found" });
  }
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (service) {
    await service.remove();
    res.json({ message: "Service removed" });
  } else {
    res.status(404).json({ message: "Service not found" });
  }
});
