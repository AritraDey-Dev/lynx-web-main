// src/screens/forgotPassword/forgotPasswordApi.js

import {
  API_BASE_URL,
  API_RESET_PASSWORD_GENERATE_OTP_STUDENTS,
  API_RESET_PASSWORD_VALIDATE_OTP_STUDENTS,
  API_RESET_PASSWORD_STUDENT,
} from "../../utils/API_CONSTANTS";

// API Error Class
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

export const generateOtpForPasswordReset = async (rollNo, recaptchaToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${API_RESET_PASSWORD_GENERATE_OTP_STUDENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
	    body: JSON.stringify({ rollNo : rollNo, recaptcha: recaptchaToken}),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.message || "An error occurred while generating OTP.",
        response.status
      );
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new APIError(
      error.message || "An unknown error occurred.",
      error.statusCode || 500
    );
  }
};

// Validate OTP for Password Reset
export const validateOtpForPasswordReset = async (rollNo, otp) => {
  try {

    const response = await fetch(`${API_BASE_URL}/${API_RESET_PASSWORD_VALIDATE_OTP_STUDENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
	    body: JSON.stringify({ rollNo:rollNo, otp:parseInt(otp) }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.message || "An error occurred while validating OTP.",
        response.status
      );
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new APIError(
      error.message || "An unknown error occurred.",
      error.statusCode || 500
    );
  }
};

// Reset Password for Student
export const resetPasswordForStudent = async (rollNo, newPassword, token) => {
  try {

    const response = await fetch(`${API_BASE_URL}/${API_RESET_PASSWORD_STUDENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
	      "token":token,
      },
	    body: JSON.stringify({ rollNo, new_password: newPassword , new_cpassword: newPassword}),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.message || "An error occurred while resetting the password.",
        response.status
      );
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new APIError(
      error.message || "An unknown error occurred.",
      error.statusCode || 500
    );
  }
};
