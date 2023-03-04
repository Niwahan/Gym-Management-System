import mongoose from "mongoose";

const DietPlanSchema = new mongoose.Schema({
  MemberID: { type: mongoose.Types.ObjectId, required: true },
  Data: { type: String },
  Day: { type: String },
  Time: { type: String },
});
const DietPlan = mongoose.model("DietPlan", DietPlanSchema);
export default DietPlan;
