// /app/tables/filters.tsx

"use client"

import { Column } from "@tanstack/react-table"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export function SelectFilter({
    column,
    title,
    options,
  }: {
    column: Column<any, unknown>
    title: string
    options: string[]
  }) {
    const value = column.getFilterValue() as string ?? "all"
  
    return (
      <div className="flex flex-col space-y-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <Select
          value={value}
          onValueChange={(val) => column.setFilterValue(val === "all" ? undefined : val)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="すべて表示" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }
  