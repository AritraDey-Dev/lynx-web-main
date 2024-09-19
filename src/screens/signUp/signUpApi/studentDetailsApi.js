import { API_BASE_URL, STUDENT_REGISTER_ENDPOINT } from "../../../utils/API_CONSTANTS";

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

const StudentDetails = async (token,body) => {
  try {
    if (!token || typeof token !== 'string') {
      throw new APIError("Invalid token provided", 400);
    }

    const response = await fetch(API_BASE_URL + STUDENT_REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({
     ...body
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new APIError(data.message || "An error occurred during registration.", response.status);
    }

    return data;
  } catch (error) {
    console.error(error.message);
    throw new APIError(error.message || "An unknown error occurred.", error.statusCode || 500);
  }
};

export default StudentDetails;
