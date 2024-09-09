export interface OtpType {
  code: string;
  mobile: string;
}

export interface SendOtpPayload {
  mobile: string;
}

export interface CheckOtpRes {
  accessToken: string;
  refreshToken: string;
}

export interface NewTokenRes {
  refreshToken: string;
}

export interface WhoAmIRes {
  id: string;
  mobile: string;
  role: string;
  createdAt: string;
}
