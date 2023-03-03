import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
