import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timeStamps: true,
  }
);
const Service = mongoose.model("Service", ServiceSchema);
export default Service;
