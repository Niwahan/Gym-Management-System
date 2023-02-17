import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  MemberID: { type: mongoose.Types.ObjectId, required: true },
  FullName: { type: String, required: true },
  Email: { type: String, required: true },
  Gender: { type: String, required: true },
  DateOfRegistration: { type: Date, required: true },
  ServiceID: { type: mongoose.Types.ObjectId, required: true },
  UserName: { type: String, required: true },
  Password: { type: String, required: true },
  PaidDate: { type: Date, required: true },
  Status: { type: String, required: true },
  AttendanceCount: { type: Number, required: true },
  InitialWeight: { type: Number, required: true },
  FinalWeight: { type: Number, required: true },
  InitialBodyType: { type: String, required: true },
  FinalBodyType: { type: String, required: true },
  ProgressDate: { type: Date, required: true },
  Trainer: { type: mongoose.Types.ObjectId, required: true },
});

const Member = mongoose.model("Member", MemberSchema);
export default Member;
