// /app/tables/page.tsx

"use client"

import { useState, useEffect } from "react"
import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table"
import { columns } from "./columns"
import { SelectFilter } from "./filters"

type Transaction = {
  date: string
  type: string
  category: string
  place: string
  amount: number
}

export default function TablesPage() {
  const [data, setData] = useState<Transaction[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("entries")
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">支出一覧</h1>

      {/* ✅ フィルター */}
      <div className="flex gap-4">
        <SelectFilter column={table.getColumn("type")} title="区分" options={["収入", "支出"]} />
        <SelectFilter column={table.getColumn("category")} title="カテゴリ" options={["食費", "交通費", "趣味", "その他"]} />
      </div>

      {/* ✅ テーブル */}
      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="p-2 text-left font-medium">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
