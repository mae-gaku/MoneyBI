"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Transaction } from "@/components/new-entry-form"

type Props = {
  entries: Transaction[]
  filter: "month" | "week" | "day"
}

export function Component({ entries, filter }: Props) {
  // データをフィルター別に整形する
  const aggregatedData = getAggregatedData(entries, filter)

  const chartConfig = {
    income: {
      label: "収入",
      color: "hsl(var(--chart-1))",
    },
    expense: {
      label: "支出",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>収支グラフ ({filter === "month" ? "月別" : filter === "week" ? "週別" : "日別"})</CardTitle>
        <CardDescription>追加したデータに基づくグラフ</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={aggregatedData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="income" stackId="a" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" stackId="a" fill="var(--color-expense)" radius={[0, 0, 4, 4]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          データに基づき更新中 <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

// データ整形関数
function getAggregatedData(entries: Transaction[], filter: "month" | "week" | "day") {
  const groups: { [key: string]: { income: number; expense: number } } = {}

  entries.forEach((entry) => {
    const date = new Date(entry.date)
    let key = ""

    if (filter === "month") {
      key = `${date.getFullYear()}-${date.getMonth() + 1}`
    } else if (filter === "week") {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
      const week = Math.ceil((((date.getTime() - firstDayOfYear.getTime()) / 86400000) + firstDayOfYear.getDay() + 1) / 7)
      key = `${date.getFullYear()}-W${week}`
    } else {
      key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    if (!groups[key]) {
      groups[key] = { income: 0, expense: 0 }
    }

    if (entry.type === "収入") {
      groups[key].income += entry.amount
    } else {
      groups[key].expense += entry.amount
    }
  })

  return Object.entries(groups).map(([label, values]) => ({
    label,
    income: values.income,
    expense: values.expense,
  }))
}
