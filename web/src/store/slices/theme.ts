import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeMode {
  mode: "dark" | "light";
  system: boolean;
}
const themeMode: ThemeMode = {
  mode: "light",
  system: true,
};
const initialState = {
  themeMode,
};

const appUI = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setSystemMode: (state, action: PayloadAction<boolean>) => {
      state.themeMode.system = action.payload;
      return;
    },
    setMode: (state, action: PayloadAction<"dark" | "light">) => {
      state.themeMode.mode = action.payload;
      state.themeMode.system = false;
    },
  },
});

export const { setSystemMode, setMode } = appUI.actions;
export default appUI.reducer;
