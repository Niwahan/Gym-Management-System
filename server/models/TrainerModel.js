import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    experience: { type: String, required: true },
  },
  {
    timeStamps: true,
  }
);

const Trainer = mongoose.model("Trainer", TrainerSchema);
export default Trainer;
