import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "./new-entry-form"
import { DataTable } from "@/components/data-table"

export const columns: ColumnDef<Transaction>[] = [
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
    accessorKey: "location",
    header: "使用場所",
  },
  {
    accessorKey: "amount",
    header: "金額",
    cell: ({ row }) => `¥${row.original.amount.toLocaleString()}`,
  },
]

export function CustomDataTable({ data }: { data: Transaction[] }) {
  return <DataTable<Transaction> columns={columns} data={data} /> // ←ここ！
}
