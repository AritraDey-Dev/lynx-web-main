import { API_LCA_URL, SECURITY_CODES_FETCH_ENDPOINT } from "../../utils/API_CONSTANTS";
import { useSelector } from "react-redux";  // Import useSelector from react-redux

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

const SecurityCodesFetch = async (token) => {  // Accept token as an argument
  try {
    const response = await fetch(API_LCA_URL + SECURITY_CODES_FETCH_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":token// Use the token from the argument
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(data.message || "An error occurred during login.", response.status);
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw new APIError(error.message || "An unknown error occurred.", error.statusCode || 500);
  }
};

export default SecurityCodesFetch;
