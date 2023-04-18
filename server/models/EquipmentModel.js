import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  purchasedDate: { type: Date, required: true },
});
const Equipment = mongoose.model("Equipment", EquipmentSchema);
export default Equipment;
