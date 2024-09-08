export interface OtpRes {
  code: string;
  mobile: string;
}

export interface SendOtpRes {
  mobile: string;
}

export interface CheckOtpRes {
  accessToken: string;
  refreshToken: string;
}

export interface NewTokenPayload {
  refreshToken: string;
}

export interface WhoAmIPayload {
  id: string;
  mobile: string;
  role: string;
  createdAt: string;
}