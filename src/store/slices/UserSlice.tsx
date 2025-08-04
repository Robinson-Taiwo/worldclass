import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  username: string;
  email: string;
  id: string;
};

type UserState = {
  user: User | null; // single user, or null if not logged in
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload, // update only the fields passed in
        };
      }
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
