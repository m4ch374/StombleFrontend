// This is essentially a landfill of temp vars

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type TTmpStore = {
  phone: string
  password: string
  pswLength: number
  businessName: string
  fullName: string
  birthday: string
  gender: string
  email: string
  link_icon: string
  verifyWithPassword: boolean
}

const init: TTmpStore = {
  phone: "",
  password: "",
  pswLength: 0,
  businessName: "",
  fullName: "",
  birthday: "",
  gender: "",
  email: "",
  link_icon: "",
  verifyWithPassword: false,
}

const tmpStoreSlice = createSlice({
  name: "tmpStore",
  initialState: init,
  reducers: {
    clearState: () => init,
    setItem: (
      state,
      action: PayloadAction<{
        key: keyof TTmpStore
        item: TTmpStore[keyof TTmpStore]
      }>,
    ) => {
      const { key, item } = action.payload

      return {
        ...state,
        [key]: item,
      }
    },
  },
})

export default tmpStoreSlice.reducer
export const tmpStoreAction = tmpStoreSlice.actions
