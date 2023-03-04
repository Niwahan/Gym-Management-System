import mongoose from "mongoose";

const AnnouncementsSchema = new mongoose.Schema({
  Date: { type: String },
  Message: { type: String },
});
const Announcements = mongoose.model("Announcements", AnnouncementsSchema);
export default Announcements;
