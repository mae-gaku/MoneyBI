// /app/tables/columns.tsx

import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "日付",
  },
  {
    accessorKey: "type",
    header: "区分",
  },
  {
    accessorKey: "category",
    header: "カテゴリ",
  },
  {
    accessorKey: "place",
    header: "使用場所",
  },
  {
    accessorKey: "amount",
    header: "金額",
    cell: info => `¥${info.getValue()?.toLocaleString()}`,
  },
]
