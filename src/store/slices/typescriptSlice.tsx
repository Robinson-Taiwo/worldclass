import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypescriptModule = {
  id: string;
  title: string;
  description: string;
  time: string;
  prerequisite: string;
  course: "typescript"; // locked to typescript
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

interface TypescriptModulesState {
  modules: TypescriptModule[];
}

const initialState: TypescriptModulesState = {
  modules: [],
};

const typescriptModulesSlice = createSlice({
  name: "typescriptModules",
  initialState,
  reducers: {
    setTypescriptModules: (
      state,
      action: PayloadAction<TypescriptModule[]>
    ) => {
      state.modules = action.payload;
    },

    addTypescriptModule: (state, action: PayloadAction<TypescriptModule>) => {
      state.modules.push(action.payload);
    },

    updateTypescriptModule: (
      state,
      action: PayloadAction<{ id: string; data: Partial<TypescriptModule> }>
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

    deleteTypescriptModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((mod) => mod.id !== action.payload);
    },
  },
});

export const {
  setTypescriptModules,
  addTypescriptModule,
  updateTypescriptModule,
  deleteTypescriptModule,
} = typescriptModulesSlice.actions;

export default typescriptModulesSlice.reducer;
