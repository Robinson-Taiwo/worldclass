// store/slices/nextjsModulesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NextjsModule = {
  id: string;
  title: string;
  description: string;
  time: string;
  prerequisite: string;
  course: "next.js"; // locked to next.js
  documentation?: string;
  youtube?: string;
  projectBrief?: string;
  acceptanceCriteria?: string;
  status?: "not started" | "in progress" | "completed";

  // 🔄 User-updatable fields
  githubLink?: string | "";
  liveLink?: string | "";
  progress?: number | null; // 0 to 100
  note?: string | "";
  journal?: string | "";
};

interface NextjsModulesState {
  modules: NextjsModule[];
}

const initialState: NextjsModulesState = {
  modules: [],
};

const nextjsModulesSlice = createSlice({
  name: "nextjsModules",
  initialState,
  reducers: {
    setNextjsModules: (state, action: PayloadAction<NextjsModule[]>) => {
      state.modules = action.payload;
    },

    addNextjsModule: (state, action: PayloadAction<NextjsModule>) => {
      state.modules.push(action.payload);
    },

    updateNextjsModule: (
      state,
      action: PayloadAction<{ id: string; data: Partial<NextjsModule> }>
    ) => {
      const { id, data } = action.payload;
      const index = state.modules.findIndex((mod) => mod.id === id);
      if (index !== -1) {
        state.modules[index] = {
          ...state.modules[index],
          ...data,
        };
      }
    },

    deleteNextjsModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((mod) => mod.id !== action.payload);
    },
  },
});

export const {
  setNextjsModules,
  addNextjsModule,
  updateNextjsModule,
  deleteNextjsModule,
} = nextjsModulesSlice.actions;

export default nextjsModulesSlice.reducer;
