

export interface UserResponse 
{
  hasError: boolean;
  message: string;
  data?: UserReducer;
}

export interface UserReducer {
  user: {
    verified?: boolean;
    accessToken: string;
    firstName?: string;
    fullName: string;
    lastName?: string;
    phoneNumber: string;
    refreshToken: string;
  };
  pendingUser?: {
    verified?: boolean;
    accessToken: string;
    firstName?: string;
    fullName: string;
    lastName?: string;
    phoneNumber: string;
    refreshToken: string;
  } | null;
}

export interface RegisterResponseData {
  firstName: string;
  fullName: string;
  lastName: string;
  phoneNumber: string;
}
