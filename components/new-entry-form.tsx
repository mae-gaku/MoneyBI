"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"

type Props = {
  onAddEntry: (entry: Transaction) => void
}

export type Transaction = {
  id: string
  date: string
  type: "収入" | "支出"
  category: string
  location: string
  amount: number
}

export function NewEntryForm({ onAddEntry }: Props) {
  const [form, setForm] = useState({
    date: "",
    type: "支出",
    category: "",
    location: "",
    amount: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: Transaction = {
      id: crypto.randomUUID(),
      date: form.date,
      type: form.type as "収入" | "支出",
      category: form.category,
      location: form.location,
      amount: Number(form.amount),
    }
    onAddEntry(newEntry)
    setForm({ date: "", type: "支出", category: "", location: "", amount: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
      <div>
        <Label>日付</Label>
        <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      </div>
      <div>
        <Label>区分</Label>
        <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="収入">収入</SelectItem>
            <SelectItem value="支出">支出</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>カテゴリ</Label>
        <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
      </div>
      <div>
        <Label>使用場所</Label>
        <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
      </div>
      <div>
        <Label>金額</Label>
        <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
      </div>
      <div className="col-span-2 md:col-span-3 lg:col-span-5">
        <Button type="submit" className="w-full">追加</Button>
      </div>
    </form>
  )
}
