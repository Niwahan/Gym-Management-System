import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    MemberID: { type: mongoose.Types.ObjectId, required: true },
    Gender: { type: String, required: true },
    DateOfRegistration: { type: Date, required: true },
    PaidDate: { type: Date, required: true },
    Status: { type: String, required: true },
    AttendanceCount: { type: Number, required: true },
    InitialWeight: { type: Number, required: true },
    FinalWeight: { type: Number, required: true },
    InitialBodyType: { type: String, required: true },
    FinalBodyType: { type: String, required: true },
    ProgressDate: { type: Date, required: true },
    Trainer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Trainers" },
    ServiceID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Services" },
  },
  {
    timeStamps: true,
  }
);

const Member = mongoose.model("Member", MemberSchema);
export default Member;
