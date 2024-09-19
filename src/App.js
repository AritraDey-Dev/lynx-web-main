import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import HomePage from "./screens/home/homePage";
import SecurityCodes from "./screens/security/security";
import SignUp from "./screens/signUp/signup";
import ForgotPassword from "./screens/forgotPassword/ForgotPassword";
import OptionScreen from "./screens/landingPage/index";
import ProfileScreen from "./screens/profilePage/profile.js";
import LoginScreen from "./screens/login/loginPage.js";
import VerifyScreen from "./screens/signUp/verifyAccount.js";
import DetailsPage from "./screens/signUp/detailsPage.js";
import DOBScreen from "./screens/signUp/registration.js";
import PhotoScreen from "./screens/signUp/profilePhoto.js";
import SetPasswordScreen from "./screens/signUp/setPassword.js";
import { setLogin } from "./state"; 
import Darktoggle from "./components/Darktoggle.js";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isAuth = Boolean(token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(setLogin({ user: "user", token: storedToken }));
    }
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
      <header>
            <Darktoggle />
          </header>
        <Routes>
          <Route path="/" element={<OptionScreen />} />
          <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register-rollNo" element={<SignUp />} />
          <Route path="/register-otp" element={<VerifyScreen />} />
          <Route path="/register-details" element={<DetailsPage />} />
          <Route path="/register-dob-details" element={<DOBScreen />} />
          <Route path="/register-profile-images" element={<PhotoScreen />} />
          <Route path="/register-setPassword" element={<SetPasswordScreen />} />
          <Route path="/security" element={<SecurityCodes />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
