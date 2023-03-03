import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  Member: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Member" },
  Date: {type: Date},
  Presence: {type: String}
});
const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;