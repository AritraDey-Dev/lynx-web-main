import { API_BASE_URL, SEND_OTP_ENDPOINT } from "../../../utils/API_CONSTANTS";

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

const SendOtp = async (rollNo,reCaptchaToken) => {
  console.log(reCaptchaToken);

  try {
    console.log("hi")
    const response = await fetch(API_BASE_URL + SEND_OTP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rollNo: rollNo,
          recaptcha: reCaptchaToken
        }),
    });
console.log("hi1")
    const data = await response.json();

    if (!response.ok) {
console.log("hi3")
console.log(response)
      // Throw an APIError instance
      throw new APIError(data.message || "An error occurred during login.", response.status);
    }

    console.log(data);

    return data;
  } catch (error) {
    
    console.log(error.message);
    throw new APIError(error.message || "An unknown error occurred.", error.statusCode || 500);
  }
};

export default SendOtp;
