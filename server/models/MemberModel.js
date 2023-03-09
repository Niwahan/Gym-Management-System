import mongoose from "mongoose";

const WorkoutSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exercises: [
    {
      _id: false, // disable automatic _id generation
      name: {
        type: String,
        required: true,
      },
      sets: {
        type: Number,
        required: true,
      },
      reps: {
        type: Number,
        required: true,
      },
    },
  ],
});

const MemberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Trainer",
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfRegistration: { type: Date, required: true },
    paidDate: { type: Date },
    plan: { type: Number },
    status: { type: String },
    attendance: {
      type: [Date],
      default: [],
    },
    initialWeight: { type: Number },
    finalWeight: { type: Number },
    initialBodyType: { type: String },
    finalBodyType: { type: String },
    progressDate: { type: Date },
    workoutPlan: [WorkoutSchema],
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
