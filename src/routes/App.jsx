import { Routes, Route } from "react-router-dom";
import Home from "../pages/publicRoutes/home/Home";
import Login from "../pages/publicRoutes/login/Login";
import DetailJob from "../pages/publicRoutes/detailJob/DetailJob";
import UploadCV from "../pages/publicRoutes/uploadCV/UploadCV";

import { baselightTheme } from "../theme/DefaultTheme";
import { ThemeProvider } from "@mui/material/styles";
import RequiredAuth from "../utils/RequiredAuth";
import Unauthorized from "../pages/publicRoutes/unauthorized/Unauthorized";
// import NotFound from "../pages/publicRoutes/notFound/404NotFound";

const App = () => {
  return (
    <ThemeProvider theme={baselightTheme}>
      <Routes>
        {/* Public routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/detail-job/:id" element={<DetailJob />} />
        <Route exact path="/job/apply/:id" element={<UploadCV />} />
        {/* Private routes for manager*/}
        {/* <Route element={<RequiredAuth allowedRoles={["QLDB"]} />}>
          <Route exact path="/manager/home" element={<DBHome />} />
          <Route
            path="/manager/manage-club"
            element={<DBManageTeam></DBManageTeam>}
          ></Route>
          <Route
            path="/manager/register-league"
            element={<DBRegister></DBRegister>}
          ></Route>
          <Route
            path="/manager/register-list"
            element={<DBRegisterList></DBRegisterList>}
          ></Route>
          <Route
            path="/manager/register-list/detail"
            element={<DBRegisterDetail />}
          />
          <Route path="/manager/schedule" element={<DBSchedule />} />
          <Route path="/manager/statistic" element={<DBStatistic />} />
        </Route> */}

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
