import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

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
      _id: false,
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

const dietPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  meals: [
    {
      name: { type: String, required: true },
      mealItems: [
        {
          name: { type: String, required: true },
          calories: { type: Number, required: true },
        },
      ],
      totalCalories: { type: Number, default: 0 },
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
    plan: { type: Number },
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
    dietPlan: [dietPlanSchema],
    payment: [PaymentSchema],
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
