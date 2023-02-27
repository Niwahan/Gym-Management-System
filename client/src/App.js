import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";

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
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />}/> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />}></Route>
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/trainers/:id" element={<TrainerDetails />} />
              <Route path="/add-members" element={<AddMembers />} />
              <Route path="/trainers/add-trainers" element={<AddTrainers />} />
              <Route path="/equipments" element={<Equipments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payments" element={<Payment />} />
              <Route path="/services" element={<Services />} />
              <Route path="/members_progress" element={<MembersProgress />} />
              <Route path="/workout_plans" element={<WorkOutPlans />} />
              <Route path="/diet_plans" element={<DietPlans />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
