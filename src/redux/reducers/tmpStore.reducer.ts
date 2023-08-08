// Carried over from legacy code

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// I have no idea how to set them via key, see below.....
type TTmpStore = {
  phone: string,
  password: string,
  businessName: string,
  isBusiness: boolean,
  fullName: string,
  birthday: string,
  gender: string,
}

const init: TTmpStore = {
  phone: "",
  password: "",
  businessName: "",
  isBusiness: false,
  fullName: "",
  birthday: "",
  gender: "",
}

const tmpStoreSlice = createSlice({
  name: 'tmpStore',
  initialState: init,
  reducers: {
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setBusinessName: (state, action: PayloadAction<string>) => {
      state.isBusiness = true
      state.businessName = action.payload
    },
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload
    },
    setBirthday: (state, action: PayloadAction<string>) => {
      state.birthday = action.payload
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload
    },
    clearState: () => init,
    // Cant be done in this way unfortunately
    // setItem: (state, action: PayloadAction<{ key: keyof TTmpStore, item: TTmpStore[keyof TTmpStore] }>) => {
    //   const { key, item } = action.payload

    //   state[key] = item 
    // },
  },
})

export default tmpStoreSlice.reducer
export const tmpStoreAction = tmpStoreSlice.actions
