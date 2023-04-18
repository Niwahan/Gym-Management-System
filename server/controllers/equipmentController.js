import asyncHandler from "express-async-handler";
import Equipment from "../models/EquipmentModel.js";

export const getEquipment = asyncHandler(async (req, res) => {
  const equipments = await Equipment.find();
  res.json(equipments);
});

export const createEquipment = asyncHandler(async (req, res) => {
  const { name, quantity, price, purchasedDate } = req.body;

  const itemExists = await Equipment.findOne({ name });

  if (itemExists) {
    res.status(400);
    throw new Error("Equipment already exists");
  }

  if (!name || !quantity || !price || !purchasedDate) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const equipment = new Equipment({
      name,
      quantity,
      price,
      purchasedDate,
    });
    const createdEquipment = await equipment.save();

    res.status(201).json(createdEquipment);
  }
});

export const getEquipmentById = asyncHandler(async (req, res) => {
  const equipment = await Equipment.findById(req.params.id);

  if (equipment) {
    res.json(equipment);
  } else {
    res.status(404).json({ message: "Equipment not found" });
  }
});

export const updateEquipment = asyncHandler(async (req, res) => {
  const { name, quantity, price, purchasedDate } = req.body;

  const equipment = await Equipment.findById(req.params.id);

  if (equipment) {
    equipment.name = name || equipment.name;
    equipment.quantity = quantity || equipment.quantity;
    equipment.price = price || equipment.price;
    equipment.purchasedDate = purchasedDate || equipment.purchasedDate;

    const updatedEquipment = await equipment.save();
    res.json({ updatedEquipment });
  } else {
    res.status(404).json({ message: "Equipment not found" });
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
