import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";
import Modal from "react-modal";

// Importing Pages
import Dashboard from "pages/dashboard/Dashboard";
import Layout from "pages/layout/Layout";
import SignIn from "pages/landingPage/SignIn";
import SignUp from "pages/landingPage/SignUp";
import Members from "pages/members/Members";
import Trainers from "pages/trainers/Trainers";
import Equipments from "pages/equipments/Equipments";
import Attendance from "pages/attendance/Attendance";
import Payment from "pages/payment/Payment";
import Services from "pages/services/Services";
import MembersProgress from "pages/membersProgress/MembersProgress";
import WorkOutPlans from "pages/workoutPlans/WorkoutPlans";
import DietPlans from "pages/dietPlans/DietPlans";
import AddMembers from "pages/members/AddMembers";
import AddTrainers from "pages/trainers/AddTrainers";
import TrainerDetails from "pages/trainers/TrainerDetails";
import AddServices from "pages/services/AddServices";
import ServiceDetails from "pages/services/ServiceDetails";
import AddEquipments from "pages/equipments/AddEquipments";
import EquipmentDetails from "pages/equipments/EquipmentDetails";
import MemberDetails from "pages/members/MemberDetails";
import SingleMemberProgress from "pages/membersProgress/SingleMemberProgress";
import SingleWorkoutPlan from "pages/workoutPlans/SingleWorkoutPlan";
import SingleDietPlan from "pages/dietPlans/SingleDietPlan";
import PaymentInvoice from "pages/payment/PaymentInvoice";
import Announcements from "pages/announcements/Announcements";
import CreateAnnouncements from "pages/announcements/CreateAnnouncements";
import EditProfile from "pages/editProfile/EditProfile";
import NotFound from "components/NotFound";
import Unauthorized from "components/Unauthorized";
import LoginRequired from "components/LoginRequired";

Modal.setAppElement("#root");

function App() {
  // For Theme
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/members" element={<Members />}></Route>
              <Route path="/members/add-members" element={<AddMembers />} />
              <Route path="/members/:id" element={<MemberDetails />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/trainers/add-trainers" element={<AddTrainers />} />
              <Route path="/trainers/:id" element={<TrainerDetails />} />
              <Route path="/equipments" element={<Equipments />} />
              <Route path="/equipments/add-equipments" element={<AddEquipments />}/>
              <Route path="/equipments/:id" element={<EquipmentDetails />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payments" element={<Payment />} />
              <Route path="/payments/:id" element={<PaymentInvoice />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/add-services" element={<AddServices />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/members_progress" element={<MembersProgress />} />
              <Route path="/members_progress/:id" element={<SingleMemberProgress />}/>
              <Route path="/workout_plans" element={<WorkOutPlans />} />
              <Route path="/workout_plans/:id" element={<SingleWorkoutPlan />}/>
              <Route path="/diet_plans" element={<DietPlans />} />
              <Route path="/diet_plans/:id" element={<SingleDietPlan />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/announcements/create-announcements" element={<CreateAnnouncements />}/>
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/loginRequired" element={<LoginRequired />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
