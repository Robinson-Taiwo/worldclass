"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { addTypescriptModule } from "@/store/slices/typescriptSlice";
import { RootState } from "@/store/store";

const moduleSchema = z.object({
  id: z.string().min(3, "ID must be at least 3 characters"),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is too short"),
  time: z.string().min(2),
  prerequisite: z.string().min(3),
  course: z.literal("typescript").optional(), // locked
  documentation: z.string().url().optional(),
  youtube: z.string().url().optional(),
  projectBrief: z.string().optional(),
  acceptanceCriteria: z.string().optional(),
  githubLink: z.string().url().optional(),
  progress: z.number().min(0).max(100).optional(),
  liveLink: z.string().url().optional(),
  note: z.string().optional(),
  journal: z.string().optional(),
});

export default function AddModulePage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // setValue,
    formState: { errors },
  } = useForm<z.infer<typeof moduleSchema>>({
    resolver: zodResolver(moduleSchema),
  });
  const dispatch = useDispatch();
  const modules = useSelector(
    (state: RootState) => state.typescriptModules.modules
  );
  console.log(modules);

  const onSubmit = (data: z.infer<typeof moduleSchema>) => {
    setLoading(true);
    setTimeout(() => {
      dispatch(
        addTypescriptModule({
          ...data,
          course: "typescript",
          status: "not started",
          githubLink: data.githubLink || "",
          progress: data.progress || 0,
          liveLink: data.liveLink || "",
          journal: data.journal || "",
        })
      );
      console.log("New module data:", data);

      setLoading(false);
      reset();
    }, 1000);
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Add New Typescript Module
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Module ID</Label>
            <Input placeholder="e.g. nextjs-auth" {...register("id")} />
            {errors.id && (
              <p className="text-sm text-red-500">{errors.id.message}</p>
            )}
          </div>
          <div>
            <Label>Title</Label>
            <Input placeholder="e.g. Authentication" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          {/* <div>
            <Label>Course</Label>
            <Select
              onValueChange={(value) =>
                setValue("course", value as "next.js" | "typescript")
              }
              defaultValue="next.js"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next.js">Next.js</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>
            {errors.course && (
              <p className="text-sm text-red-500">{errors.course.message}</p>
            )}
          </div> */}
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
            <Input placeholder="e.g. 30 mins" {...register("time")} />
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>

          <div>
            <Label>Prerequisite</Label>
            <Input placeholder="e.g. HTML, JS" {...register("prerequisite")} />
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
            placeholder="https://doc.link"
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
