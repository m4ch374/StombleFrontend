import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserReducer } from "../types";

export const USER_INITIAL_STATE: UserReducer = 
{
  user: 
  {
    fullName: "",
    phoneNumber: "",
    accessToken: "",
    refreshToken: "",
  },
  pendingUser: null,
};

const slice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setUser: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    setPendingUser: (state, { payload }: PayloadAction<any>) => {
      state.pendingUser = payload;
    },
    clearUser: (state) => {
      state = USER_INITIAL_STATE;
    },
    clearPendingUser: (state) => {
      state.pendingUser = null;
    },
  },
});

export const { setUser, clearUser, setPendingUser, clearPendingUser } =
  slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.user.accessToken;
export const selectPendingUser = (state: RootState) => state.user.pendingUser;
