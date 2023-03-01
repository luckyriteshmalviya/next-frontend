import {
  setLogin,
  setLoginError,
  setUserData,
} from "redux/actions/userActions/action";
import { getLocalStorageData } from "utils/function";
import Request from "utils/request";
import { handleAuthToken } from "./auth";

export const getUserDetail = () => async (dispatch) => {
  try {
    const response = await Request({
      method: "GET",
      url: "user/userDetail",
    });

    const { status_code, message, data } = response.data;

    if (status_code === 200) {
      dispatch(setUserData(data));
    } else {
      console.log(message);
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function is used to get User data when token is stored in local storage
 * @param {*} config {loader} {type}
 * @returns
 */
export const userLogin = (otp, number) => async (dispatch) => {
  try {
    const response = await Request({
      method: "POST",
      url: "user/userLogin",
      data: {
        phone: number,
        otp: otp,
        authType: "MOBILE",
      },
    });

    const { status_code, message, data } = response.data;

    if (status_code === 200) {
      dispatch(setLogin(false));
      await dispatch(handleAuthToken(data?.token));
      await dispatch(setUserData(data?.user));
      return true;
    } else {
      console.log(message);

      alert(` ${message}`);
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
    return;
  }
};

export const getOtp = async (phoneNo, isLogin) => {
  if (!phoneNo) {
    alert("Please enter phone no");
    return;
  }
  try {
    const response = await Request({
      method: "POST",
      url: "user/employeeOTP",
      data: {
        phone: phoneNo,
        isLogin: isLogin,
      },
    });

    const { status_code, message, data } = response.data;

    if (status_code === 200) {
      return true;
    } else {
      console.log(message);
      alert(message);
      return false;
    }
  } catch (error) {
    console.log(error);
    // return "Something went wrong";
  }
};

export const employeeSignup = (otp, phone) => async (dispatch) => {
  try {
    const employeeSignUpData = getLocalStorageData(["name", "email"]);

    const response = await Request({
      method: "POST",
      url: "user/employeeSignup",
      data: {
        ...employeeSignUpData,
        phone: phone,
        authType: "MOBILE",
        otp: otp,
        type: "Jobseeker",
      },
    });

    const { status_code, message, data } = response?.data;

    if (status_code === 200 || status_code === 201) {
      await dispatch(handleAuthToken(data?.token));
      await dispatch(setUserData(data?.user));
      return true;
    } else {
      alert(`${message}`);
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
    return;
  }
};

export const uploadResume = async (file) => {
  try {
    let formdata = new FormData();
    formdata.append("file", file);
    const response = await Request({
      method: "POST",
      url: "user/uploadResume",
      data: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { status_code, data } = response.data;
    if (status_code === 200 || status_code === 201) {
      console.log("success");
      return true;
    } else {
      alert(`${message}`);
      return false;
    }
  } catch (error) {
    console.log("error");
  }
};

export const sendEmployeeDetails = async () => {
  const formData = getLocalStorageData([
    "domain-role",
    "immediateJoiner",
    "jobType",
    "resume",
    "availableAfter",
    "modeOfAvailability",
    "preferredLocation",
    "currentlyEmployed",
    "current-status",
    "experience",
  ]);

  try {
    const response = await Request({
      method: "POST",
      url: "user/employeeDetails",
      data: {
        type: "Jobseeker",
        authType: "MOBILE",
        ...formData,
      },
    });

    const { status_code, message } = response.data;
    if (status_code === 200) {
      return true;
    } else {
      alert(`${message}`);
      return false;
    }
  } catch (error) {
    console.log("error");
    alert("Something went wrong");
    return false;
  }
};

export const employerSignupHandler = async () => {
  let employerDetails = JSON.parse(localStorage.getItem("recruter-info"));

  try {
    const response = await Request({
      method: "POST",
      url: "user/employerSignup",
      data: { ...employerDetails, type: "Recruiter" },
    });
    const { status_code, message } = response.data;
    if (status_code === 201) {
      console.log("success");
    } else {
      alert(`${message}`);
    }
  } catch (error) {
    console.log("error");
    alert("Something went wrong");
  }
};
