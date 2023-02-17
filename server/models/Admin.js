import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    
      UserID: { type: mongoose.Types.ObjectId },
      UserName: { type: String, required: true },
      Password: { type: String, required: true },
      Name: { type: String, required: true },
    });
    
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
