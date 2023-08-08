// Currently only store one single token, will expand in 
// the future to accommodate multiple tokens

import AsyncStorage from "@react-native-async-storage/async-storage"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type TTokens = {
  currentToken: string,
}

const init: TTokens = {
  currentToken: "",
}

const tokenSlice = createSlice({
  name: "tokens",
  initialState: init,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      (async () => {
        await AsyncStorage.setItem("token", action.payload)
      })()

      state.currentToken = action.payload
    },
    clearToken: () => init,
  },
})

export default tokenSlice.reducer
export const tokenAction = tokenSlice.actions
