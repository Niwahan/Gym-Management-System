import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  Member: { type: mongoose.Types.ObjectId, required: true},
  Member: {type: String},
  Date: {type: Date},
  Presence: {type: String}

});
const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;