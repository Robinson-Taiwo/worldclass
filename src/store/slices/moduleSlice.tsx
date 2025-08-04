import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Module = {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  course: string;
  link: string;
  done: boolean;
};

export type ModuleState = {
  modules: Module[];
};

const initialState: ModuleState = {
  modules: [],
};

const ModuleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    addModule: (state, action: PayloadAction<Module>) => {
      state.modules.push(action.payload);
    },

    updateModule: (state, action: PayloadAction<Module>) => {
      const index = state.modules.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.modules[index] = action.payload;
      }
    },

    deleteModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const {addModule, updateModule, deleteModule} = ModuleSlice.actions

export default ModuleSlice.reducer;
