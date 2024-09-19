import { API_BASE_URL, PROFILE_ENDPOINT } from "../../utils/API_CONSTANTS";

// Custom APIError class to handle API errors
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

// Async function to fetch user profile data from the API
const ProfileUser = async (token) => {
  try {
    const response = await fetch(API_BASE_URL + PROFILE_ENDPOINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token":token // Use the token passed as a parameter
      },
    });

    const data = await response.json(); // Parse the JSON response

    if (!response.ok) { // Check if the response status is not OK
      throw new APIError(data.message || "An error occurred while loading your profile.", response.status);
    }

    return data; // Return the user profile data
  } catch (error) {
    console.error(error.message);
    throw new APIError(error.message || "An unknown error occurred.", error.statusCode || 500);
  }
};

export default ProfileUser;
