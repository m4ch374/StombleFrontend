import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import user from "./reducers/user.reducer";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "stomble",
  storage: AsyncStorage,
  blacklist: ["user"],
};

const reducers = combineReducers({
  user,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
export const persistor = persistStore(store);
