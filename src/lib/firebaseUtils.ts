import { collection, getDocs } from "firebase/firestore";
import { NextjsModule } from "@/store/slices/moduleSlice"; // 👈 import the type
import { db } from "@/firebase/firebaseConfig";

export const fetchNextjsModules = async (): Promise<NextjsModule[]> => {
  const snapshot = await getDocs(collection(db, "nextjsModules"));
  const modules: NextjsModule[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || "",
      description: data.description || "",
      time: data.time || "",
      prerequisite: data.prerequisite || "",
      course: data.course || "next.js",
      documentation: data.documentation || "",
      youtube: data.youtube || "",
      projectBrief: data.projectBrief || "",
      acceptanceCriteria: data.acceptanceCriteria || "",
      status: data.status || "not started",
      githubLink: data.githubLink || "",
      liveLink: data.liveLink || "",
      progress: data.progress || 0,
      note: data.note || "",
      journal: data.journal || "",
    };
  });

  return modules;
};
