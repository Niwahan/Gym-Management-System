import mongoose from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema({
  UserID: { type: mongoose.Types.ObjectId, required: true },
  Data: { type: String, required: true },
  Day: { type: String, required: true },
  Member: { type: mongoose.Types.ObjectId, required: true },
  MemberName: { type: String, required: true },
});
const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
export default WorkoutPlan;
