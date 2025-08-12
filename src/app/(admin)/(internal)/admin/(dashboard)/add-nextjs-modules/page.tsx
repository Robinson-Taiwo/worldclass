"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addNextjsModule } from "@/store/slices/moduleSlice";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

const moduleSchema = z.object({
  id: z.string().min(3, "ID must be at least 3 characters").optional(),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  time: z.string().min(2),
  prerequisite: z.string().min(3),
  course: z.literal("nextjs").optional(),
  documentation: z.string().url().optional(),
  youtube: z.string().url().optional(),
  projectBrief: z.string().optional(),
  acceptanceCriteria: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),

  // user-editable fields excluded from schema since users update them later
});

export default function AddNextModulePage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof moduleSchema>>({
    resolver: zodResolver(moduleSchema),
  });

  const dispatch = useDispatch();
  const modules = useSelector((state: RootState) => state.module.modules);
  console.log("Next.js Modules:", modules);

 const onSubmit = async (data: z.infer<typeof moduleSchema>) => {
    setLoading(true);

    try {
      const id = uuidv4();
      const progress = data.progress || 0;

      let status: "not started" | "in progress" | "completed" = "not started";
      if (progress > 0 && progress < 100) status = "in progress";
      if (progress === 100) status = "completed";

      const newModule = {
        ...data,
        id,
        course: "nextjs",
        status,
        githubLink: "",
        liveLink: "",
        note: "",
        journal: "",
        progress,
      };

      // 🚀 Save to Redux
     dispatch(
        addNextjsModule({
          ...data,
          id,
          course: "next.js",
          status,
          githubLink: "",
          liveLink: "",
          note: "",
          journal: "",
          progress,
        })
      );
const cleanedModule = JSON.parse(JSON.stringify(newModule));

      // 🔥 Save to Firestore
      const docRef = await addDoc(collection(db, "nextjsModules"), cleanedModule);
      console.log("Saved to Firestore with ID:", docRef.id);

      reset();
    } catch (error) {
      console.error("Error adding module to Firestore:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl w-full mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Add New Next.js Module</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input placeholder="e.g. Authentication" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            placeholder="Brief overview of the module..."
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Time</Label>
            <Input placeholder="e.g. 45 mins" {...register("time")} />
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>

          <div>
            <Label>Prerequisite</Label>
            <Input placeholder="e.g. React, JS" {...register("prerequisite")} />
            {errors.prerequisite && (
              <p className="text-sm text-red-500">
                {errors.prerequisite.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label>Documentation Link</Label>
          <Input
            type="url"
            placeholder="https://docs.example.com"
            {...register("documentation")}
          />
        </div>

        <div>
          <Label>Youtube Video Link</Label>
          <Input
            type="url"
            placeholder="https://youtube.com/..."
            {...register("youtube")}
          />
        </div>

        <div>
          <Label>Project Brief</Label>
          <Textarea
            placeholder="What should the student build?"
            {...register("projectBrief")}
          />
        </div>

        <div>
          <Label>Acceptance Criteria</Label>
          <Textarea
            placeholder="What are the expectations?"
            {...register("acceptanceCriteria")}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Add Module"}
        </Button>
      </form>
    </div>
  );
}
