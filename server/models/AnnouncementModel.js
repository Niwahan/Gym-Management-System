import mongoose from "mongoose";

const AnnouncementsSchema = new mongoose.Schema({
  date: { type: Date },
  title: { type: String },
  message: { type: String },
});
const Announcement = mongoose.model("Announcement", AnnouncementsSchema);
export default Announcement;
