// export const API_BASE_URL = "https://api.lynx.spider.nitt.edu" //prod base url
export const API_BASE_URL = "http://localhost:4000"; //dev base url

export const API_LCA_URL = "https://restapis.lcas.spider-nitt.org";

export const LOGIN_ENDPOINT = "/auth/student/login";

export const PROFILE_ENDPOINT = "/api/student/detail";

export const SECURITY_CODES_FETCH_ENDPOINT = "/fetchOTP";

export const SEND_OTP_ENDPOINT = "/auth/student/sendOtp";

export const VERIFY_OTP_ENDPOINT = "/auth/student/verifyOtp";

export const STUDENT_REGISTER_ENDPOINT = "/auth/student/register";

export const API_RESET_PASSWORD_STUDENT = "auth/forgotpwd/student/newPassword";

export const API_RESET_PASSWORD_VALIDATE_OTP_STUDENTS =
  "auth/forgotpwd/student/validateOtp";

export const API_RESET_PASSWORD_GENERATE_OTP_STUDENTS =
  "auth/forgotpwd/student/sendOtp";
export const API_GET_DEPARTMENT = '/api/department-list';
