import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
  EquipmentID: { type: mongoose.Types.ObjectId, required: true },
  Name: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Number, required: true },
});
const Equipment = mongoose.model("Equipment", EquipmentSchema);
export default Equipment;
