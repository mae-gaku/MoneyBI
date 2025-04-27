'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const sampleData = [
  { name: "食費", value: 12000 },
  { name: "交通", value: 4500 },
  { name: "光熱費", value: 8000 },
  { name: "娯楽", value: 3000 },
]

export function ChartBar() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={sampleData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}
