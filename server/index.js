import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dontenv from 'dotenv'
import helmet from 'helmet';
import morgan from 'morgan';
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js"

// Route Import
import userRoutes from './routes/userRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"


// Data Import
import User from './models/UserModel.js';
import Admin from "./models/Admin.js";
import Announcements from "./models/Announcements.js";
import Attendance from "./models/Attendance.js";
import DietPlan from "./models/DietPlan.js";
import Equipments from "./models/Equipments.js";
import Member from "./models/Member.js";
import Services from "./models/Services.js";
import WorkoutPlan from "./models/WorkoutPlan.js";

import { dataUser } from './data/index.js';


// CONFIGURATION
dontenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/members", memberRoutes);
// app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);

app.use(notFound);
app.use(errorHandler);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    console.log(`MongoDB Connected`);
    // Only add data one time
    // User.insertMany(dataUser);
}).catch((error) => console.log(`${error} Did not connect`));
    