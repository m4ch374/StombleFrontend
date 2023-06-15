import apiConnect from "../utils/apiConnect";

const userSignUp = (data: any) => {
  return apiConnect.post("", data);
};
const resetPassword = (data: any) => {
  return apiConnect.post("stomble/no-auth/complete-forgot-password", data);
};
const createPin = (data: { token: string; pin: string }) => {
  return apiConnect.post(
    "customer/create-pin",
    {
      pin: data.pin,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};
const login = (data: any) => {
  return apiConnect.post('stomble/no-auth/login', data);
};
const forgotPassword = (data: any) => {
  return apiConnect.post('stomble/no-auth/init-forgot-password', data);
};
const confirmOTP = (data: any) => {
  return apiConnect.post('stomble/no-auth/confirm-forgot-password', data);
};

const generateOTP = (data: { username: string; token: string }) => {
  return apiConnect.post(
    `/stomble/send-otp/${data.username}?medium=EMAIL`,
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
};

const verifyAccount = (data: { token: string; ref: string; otp: string }) => {
  const { token, ref, otp } = data;
  return apiConnect.post(
    'stomble/verify-account',
    {
      otp,
      ref,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const AuthService = {
  userSignUp,
  resetPassword,
  createPin,
  login,
  forgotPassword,
  confirmOTP,
  generateOTP,
  verifyAccount,
};
