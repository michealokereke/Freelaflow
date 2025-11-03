import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import appUIReducer from "./slices/theme";
import authReducer from "./slices/auth";

const store = configureStore({
  reducer: {
    ui: appUIReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
