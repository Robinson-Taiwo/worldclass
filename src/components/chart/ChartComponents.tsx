// components/ProgressLineChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


const streakData = [
  { date: '2023-10-01', progress: 20 },
  { date: '2023-10-02', progress: 30 },
  { date: '2023-10-03', progress: 50 },
  { date: '2023-10-04', progress: 70 },
  { date: '2023-10-05', progress: 90 },
  { date: '2023-10-06', progress: 100 },
];
export default function StreakChart () {
  return (
    <div className="w-full h-full bg-white rounded-lg p-1 ">
      <h2 className="text-xl font-semibold mb-4">📈 Your Progress</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={streakData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="orange" />
          <YAxis stroke="orange" />
          <Tooltip />
          <Line type="monotone" dataKey="progress" stroke="orange" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
