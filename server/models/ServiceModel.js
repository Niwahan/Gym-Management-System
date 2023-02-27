import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Period: { type: Number, required: true },
  },
  {
    timeStamps: true,
  }
);
const Service = mongoose.model("Service", ServiceSchema);
export default Service;
