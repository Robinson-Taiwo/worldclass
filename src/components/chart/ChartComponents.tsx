// components/ProgressLineChart.tsx
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const streakData = [
  { date: "Mon", progress: 20 },
  { date: "Tue", progress: 10 },
  { date: "Wed", progress: 40 },
  { date: "Thu", progress: 70 },
  { date: "Fri", progress: 60 },
  { date: "Sat", progress: 100 },
  { date: "Sun", progress: 10 },
];
export default function StreakChart() {
  return (
    <div className="w-full h-full p-0  relative bg-white rounded-lg lg:p-1 ">
      <h2 className="lg:text-xl px-4 text-base font-semibold mb-4">
        📈 Your Progress
      </h2>
      <ResponsiveContainer
        width="100%"
        className=" text-sm absolute left-0    "
        height="100%"
      >
        <LineChart
          data={streakData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="orange" />
          <YAxis stroke="orange" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="progress"
            stroke="orange"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
