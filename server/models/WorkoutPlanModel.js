import mongoose from "mongoose";

const WorkoutPlanSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  date: { type: Date, required: true },
  workout: { type: String, required: true },
  // trainer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Trainer",
  // },
});
const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);
export default WorkoutPlan;
