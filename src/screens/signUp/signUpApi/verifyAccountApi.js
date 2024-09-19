import { API_BASE_URL, VERIFY_OTP_ENDPOINT } from "../../../utils/API_CONSTANTS";

// Custom error class for handling API errors
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

const VerifyOtp = async (rollNo, otp) => {
  try {
    // Debugging log to ensure values are correct
    console.log('VerifyOtp called with rollNo:', rollNo, 'and otp:', otp);

    // Check if rollNo and otp are provided
    if (!rollNo || !otp) {
      console.error('Roll number or OTP is missing.');
      throw new APIError('Roll number or OTP is missing.', 400);
    }

    const response = await fetch(API_BASE_URL + VERIFY_OTP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rollNo: rollNo,
        otp: otp
      }),
    });

    // Check if the response is JSON
    const data = await response.json().catch(() => {
      throw new APIError("Invalid JSON response", response.status);
    });

    // Handle non-OK responses
    if (!response.ok) {
      console.error('API responded with an error:', data.message);
      throw new APIError(data.message || "An error occurred during OTP verification.", response.status);
    }

    // Debugging log to confirm the response data
    console.log('OTP verification successful:', data);

    return data;
  } catch (error) {
    // Improved error logging
    console.error('Error during OTP verification:', error.message);
    throw new APIError(error.message || "An unknown error occurred during OTP verification.", error.statusCode || 500);
  }
};

export default VerifyOtp;
