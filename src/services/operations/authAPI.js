import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
// import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API = "",
  // RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  console.log("send otp email", email);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    console.log("loading");
    dispatch(setLoading(true));

    console.log("after loading", email);
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        console.log(response.data.message);
        toast.error(response.message.data);
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  // accountType,
  firstName,
  lastName,
  registrationNumber,
  email,
  hostelName,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    console.log("inside auth api signup");

    try {
      console.log("HOSTEL NAME", hostelName);
      const response = await apiConnector("POST", SIGNUP_API, {
        // accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        hostelName,
        registrationNumber,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  console.log("inside login auth API");
  return async (dispatch) => {
    console.log("E", email, password);
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      // console.log("type of:", typeof response);
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
export function getPasswordResetToken(email, setEmailSent) {
  console.log("inside reset passwordToken api");
  return async (dispatch) => {
    dispatch(setLoading(true));
    // try {
    //   // const hardcodedApiUrl = "https://api.example.com/resetPasswordToken";
    //   const response = await apiConnector("POST", RESETPASSTOKEN_API, {
    //     email,
    //   });
    //   console.log("API response ", response);
    //   if (!response.data.success) {
    //     throw new Error(response.data.message);
    //   }
    //   toast.success("Email sent succesfully");
    //   setEmailSent(true);
    // } catch (error) {
    //   console.log("error in resetPassword", error);
    //   toast.error("Failed to sent otp");
    // }
    dispatch(setLoading(false));
  };
}
