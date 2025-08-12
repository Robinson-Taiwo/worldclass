// lib/moduleUtils.ts
import { AppDispatch } from "@/store/store";
import { deleteNextjsModule } from "@/store/slices/moduleSlice";
import { deleteTypescriptModule } from "@/store/slices/typescriptSlice";

export const handleDeleteModule = (
  dispatch: AppDispatch,
  id: string,
  course: "nextjs" | "typescript"
) => {
  if (course === "nextjs") {
    dispatch(deleteNextjsModule(id));
  } else if (course === "typescript") {
    dispatch(deleteTypescriptModule(id));
  }
};
