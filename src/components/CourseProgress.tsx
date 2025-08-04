"use client";

import React from "react";

type CourseProgressProps = {
  title: string;
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
};

const CourseProgress = ({
  title,
  completed,
  total,
  size = 120,
  strokeWidth = 10,
}: CourseProgressProps) => {
  const progress = Math.round((completed / total) * 100);
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Title */}
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>

      {/* Circular Progress Chart */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="orange"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute text-lg font-semibold text-orange-600">
          {progress}%
        </span>
      </div>

      {/* Completion Label */}
      <p className="text-sm text-center w-full text-muted-foreground">
        {completed} / {total} modules completed
      </p>
    </div>
  );
};

export default CourseProgress;
