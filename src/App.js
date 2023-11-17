import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import "./index.css";
import "./assets/styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import MyProfile from "./components/Dashboard/MyProfile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUS from "./pages/AboutUS";
import VerifyEmail from "./pages/verifyEmail";
import Settings from "../src/components/Dashboard/Settings";
import AddComplaint from "./components/Dashboard/AddComplaint";
import MyComplaint from "./components/Dashboard/MyComplaint";
import AllComplaints from "./components/Dashboard/AllComplaints";
import Menu from "./components/Dashboard/Menu/Menu";
import EditMessMenu from "./components/Dashboard/Menu/EditMessMenu";
import PrivateRoute from "./components/AuthRoute/PrivateRoute";
import { ACCOUNT_TYPE } from "./utils/constants";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);
  const accountType = user?.accountType || null;
  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/aboutUs" element={<AboutUS />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>
            <Route path="dashboard/Settings" element={<Settings />}></Route>
            {(accountType === ACCOUNT_TYPE.STUDENT ||
              accountType === ACCOUNT_TYPE.MESS_COMMITEE ||
              accountType === ACCOUNT_TYPE.WARDEN) && (
              <>
                {accountType !== ACCOUNT_TYPE.WARDEN && (
                  <>
                    <Route
                      path="dashboard/add-complaint"
                      element={<AddComplaint />}
                    />
                    <Route
                      path="dashboard/my-complaint"
                      element={<MyComplaint />}
                    />
                  </>
                )}
                <Route
                  path="dashboard/all-complaints"
                  element={<AllComplaints />}
                />

                <Route path="dashboard/mess-menu" element={<Menu />} />
              </>
            )}
            {/* {accountType === ACCOUNT_TYPE.MESS_COMMITEE && ( */}
            <Route
              path="dashboard/mess-menu/edit-mess-menu"
              element={<EditMessMenu />}
            />
            {/* )} */}
          </Route>

          {/* <Route path="dashboard/Settings" element={<Settings />} /> */}
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
