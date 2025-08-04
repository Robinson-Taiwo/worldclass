"use client";

import { CheckCircle} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type ModuleCardProps = {
  title: string;
  description: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  href: string;
  onMarkDone?: () => void;
  isLoading?: boolean;
};

export function ModuleCard({
  title,
  description,
  progress,
  status,
  href,
  onMarkDone,
  isLoading = false,
}: ModuleCardProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md rounded-lg">
        <CardHeader>
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-3 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-3 w-1/4" />
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-full sm:w-40" />
        </CardFooter>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card className="w-full max-w-md rounded-lg transition-all hover:shadow-md">
      <CardHeader className="flex w-full flex-row overflow-x-hidden items-start justify-between gap-2">
        <div className="w-full" >
          <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
          <Badge className={cn("text-xs", getStatusColor(status))}>
            {status === "completed" && "Completed"}
            {status === "in-progress" && "In Progress"}
            {status === "not-started" && "Not Started"}
          </Badge>
          <CardDescription className="text-sm max-h-16 h-16 w-full max-w-full overflow-x-hidden overflow-hidden text-wrap float-right  text-ellipsis mt-2 text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{progress}% completed</p>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <Link
          href={href}
          className="text-sm underline text-orange-600 hover:text-orange-700"
        >
          View Module
        </Link>
        <button
          onClick={onMarkDone}
          disabled={status === "completed"}
          className={cn(
            "text-sm flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all w-fit lg:w-fit sm:w-auto",
            status === "completed"
              ? "bg-green-100 text-green-700 border-green-300 cursor-not-allowed"
              : "bg-orange-600 text-white hover:bg-orange-700"
          )}
        >
          {status === "completed" ? (
            <>
              <CheckCircle className="w-4 h-4" /> Done
            </>
          ) : (
            <>
              Mark as Done
            </>
          )}
        </button>
      </CardFooter>
    </Card>
  );
}
