import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { persistReducer } from "redux-persist"
import { combineReducers } from "redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import persistStore from "redux-persist/es/persistStore"

import tmpStoreReducer from "./reducers/tmpStore.reducer"
import tokensReducer from "./reducers/tokens.reducer"

// The architecture is more or less carried over by the legacy code
// in shadow realm

const persistConfig = {
  key: "stomble",
  storage: AsyncStorage,
  blacklist: ["tmpStore"],
}

const reducers = combineReducers({
  tmpStore: tmpStoreReducer,
  tokens: tokensReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,

  // I honestly have no idea what it does, gonna research that over the weekends
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
export const persistor = persistStore(store)
