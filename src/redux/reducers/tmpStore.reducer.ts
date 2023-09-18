// This is essentially a landfill of temp vars

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type TTmpStore = {
  userId: string
  phone: string
  password: string
  pswLength: number
  businessName: string
  fullName: string
  birthday: string
  gender: string
  bio: string
  link: {
    url: string
    text: string
  } // link to user's url
  email: string
  link_icon: string
  verifyWithPassword: boolean
  message: string
  numLiked: number
  numShared: number
  numFollowing: number
}

const init: TTmpStore = {
  userId: "",
  phone: "",
  password: "",
  pswLength: 0,
  businessName: "",
  fullName: "",
  birthday: "",
  gender: "",
  bio: "",
  link: {
    url: "",
    text: "",
  },
  email: "",
  link_icon: "",
  verifyWithPassword: false,
  message: "",
  numLiked: 0,
  numShared: 0,
  numFollowing: 0,
}

const tmpStoreSlice = createSlice({
  name: "tmpStore",
  initialState: init,
  reducers: {
    clearState: () => init,
    setItem: {
      prepare: (
        ...args: [key: keyof TTmpStore, item: TTmpStore[keyof TTmpStore]]
      ) => {
        return { payload: args }
      },
      reducer: (
        state,
        action: PayloadAction<
          [key: keyof TTmpStore, item: TTmpStore[keyof TTmpStore]]
        >,
      ) => {
        const [key, item] = action.payload
        return { ...state, [key]: item }
      },
    },
    setState: (
      state,
      action: PayloadAction<TTmpStore | ((input: TTmpStore) => TTmpStore)>,
    ) => {
      const { payload } = action
      if (typeof payload === "object") return { ...payload }

      return payload(state)
    },
  },
})

export default tmpStoreSlice.reducer
export const tmpStoreAction = tmpStoreSlice.actions
