"use client"

import { Transaction } from "@/components/new-entry-form"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { format, parseISO } from "date-fns"

type Props = {
  entries: Transaction[]
  filter: "day" | "week" | "month"
}

export function SpendingChart({ entries, filter }: Props) {
  const spendingEntries = entries.filter(entry => entry.type === "支出")

  // 日付ごとにまとめる
  const groupedData: { [key: string]: { [category: string]: number } } = {}

  spendingEntries.forEach(entry => {
    let dateKey = entry.date

    if (filter === "week") {
      // 週単位なら「年-週番号」に変換
      const date = parseISO(entry.date)
      const week = getWeekNumber(date)
      dateKey = `${date.getFullYear()}-W${week}`
    } else if (filter === "month") {
      // 月単位なら「年-月」に変換
      const date = parseISO(entry.date)
      dateKey = format(date, "yyyy-MM")
    }

    if (!groupedData[dateKey]) {
      groupedData[dateKey] = {}
    }
    if (!groupedData[dateKey][entry.category]) {
      groupedData[dateKey][entry.category] = 0
    }
    groupedData[dateKey][entry.category] += entry.amount
  })

  // グラフ用データに変換
  const data = Object.entries(groupedData).map(([date, categories]) => ({
    date,
    ...categories,
  }))

  // すべてのカテゴリリストを取得
  const allCategories = Array.from(
    new Set(spendingEntries.map(entry => entry.category))
  )

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {allCategories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            stackId="a" // 👈 これで縦積みされる
            fill={getColor(index)}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

// 日付から「週番号」を出す関数
function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// 色を適当に回す関数
function getColor(index: number) {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#8dd1e1",
    "#d0ed57",
    "#a4de6c",
    "#d88884",
  ]
  return colors[index % colors.length]
}
