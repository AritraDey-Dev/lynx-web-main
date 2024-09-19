import { API_BASE_URL, LOGIN_ENDPOINT } from "../../utils/API_CONSTANTS";

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

const LoginUser = async (rollNo, password) => {
  try {
    const response = await fetch(API_BASE_URL + LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollNo: rollNo,
        password: password,
        reg_token: rollNo, // Ensure this is correct and intended
      }),
    });

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
      // Throw an APIError instance
      throw new APIError(data.message || "An error occurred during login.", response.status);
    }

    console.log(data);

    return {
      message: data.message,
      statusCode: response.status,
      token:data.token
    };
  } catch (error) {
    console.log(error.message);
    throw new APIError(error.message || "An unknown error occurred.", error.statusCode || 500);
  }
};

export default LoginUser;