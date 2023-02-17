import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  ServiceID: { type: mongoose.Types.ObjectId, required: true },
  Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Period: { type: Number, required: true },
});
const Service = mongoose.model("Service", ServiceSchema);
export default Service;