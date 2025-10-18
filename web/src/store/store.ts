import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import appUIReducer from "./slices/theme";

const store = configureStore({
  reducer: {
    ui: appUIReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
