export interface OTP {
  code: string;
  mobile: string;
}
export interface sendOtpRes {
  mobile: string;
}
export interface checkOtpRes {
  accessToken: string;
  refreshToken: string;
}
export interface newToken {
  refreshToken: string;
}
export interface whoAmI {
  id: string;
  mobile: string;
  role: string;
  createdAt: string;
}
