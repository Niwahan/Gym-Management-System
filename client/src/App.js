import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { themeSettings } from "theme";
// import { ColorModeContext, useMode } from "theme1";
import Dashboard from "pages/dashboard/Dashboard";
import Layout from "pages/layout/Layout";
import Members from "pages/members/Members";
import SignIn from "pages/landingPage/SignIn";
import SignUp from "pages/landingPage/SignUp";

function App() {
  // For Theme
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  // For Theme1
  // const [ theme, colorMode] = useMode();

  return (
    <div className="app">
      <BrowserRouter>
        {/* //For Theme 1 */}
        {/* // <ColorModeContext.Provider value={colorMode}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Layout />}>
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />}/> */}

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
            </Route>
          </Routes>
          {/* <main className="content">
              <TopBar/>
            </main> */}
        </ThemeProvider>
        {/* // </ColorModeContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
