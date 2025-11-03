import { createSlice } from "@reduxjs/toolkit";

interface AuthUserT {
  email: string;
  emailVerified: boolean;
  fullName: string;
  role: "OWNER" | "MEMEBER" | "VIEWER";
  id: string;
  organizationName: string;
  organizationId: string;
}
interface AuthStateT {
  user: AuthUserT | null;
}

const initialState: AuthStateT = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (store, action) => {
      store.user = action.payload;
    },

    clearUser: (store) => {
      store.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
