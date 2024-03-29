import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dontenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Route Import
import userRoutes from "./routes/userRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import memberProgressRoutes from "./routes/memberProgressRoutes.js";
import workoutPlanRoutes from "./routes/workoutPlanRoutes.js";
import dietPlanRoutes from "./routes/dietPlanRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";

// Model Import
import User from "./models/UserModel.js";
import Trainer from "./models/TrainerModel.js";
import Announcement from "./models/AnnouncementModel.js";
import Equipment from "./models/EquipmentModel.js";
import Member from "./models/MemberModel.js";
import Service from "./models/ServiceModel.js";

// CONFIGURATION
dontenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/equipments", equipmentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/membersProgress", memberProgressRoutes);
app.use("/api/workoutPlan", workoutPlanRoutes);
app.use("/api/dietPlan", dietPlanRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/announcements", announcementRoutes);

app.use(notFound);
app.use(errorHandler);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log(`MongoDB Connected`);
  })
  .catch((error) => console.log(`${error} Did not connect`));
