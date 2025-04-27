"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { StatCard } from "@/components/ui/stat-card"
import { SpendingChart } from "@/components/ui/spending-chart"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { NewEntryForm, Transaction } from "@/components/new-entry-form"
import { CustomDataTable } from "@/components/custom-data-table" // 👈 カスタム列用に差し替え

export default function Page() {
  const [filter, setFilter] = useState<"month" | "week" | "day">("month")
  const [entries, setEntries] = useState<Transaction[]>([])

  // ✅ ローカルストレージから初期読み込み
  useEffect(() => {
    const stored = localStorage.getItem("entries")
    if (stored) {
      setEntries(JSON.parse(stored))
    }
  }, [])

  // ✅ ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries))
  }, [entries])

  const totalIncome = entries.filter(e => e.type === "収入").reduce((sum, e) => sum + e.amount, 0)
  const totalSpending = entries.filter(e => e.type === "支出").reduce((sum, e) => sum + e.amount, 0)

  const handleAddEntry = (entry: Transaction) => {
    setEntries(prev => [...prev, entry])
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* 💰 カード */}
              <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:px-6">
                <StatCard title="収入" value={`¥${totalIncome.toLocaleString()}`} />
                <StatCard title="支出" value={`¥${totalSpending.toLocaleString()}`} />
              </div>

              {/* 📝 フォーム */}
              <NewEntryForm onAddEntry={handleAddEntry} />

              {/* 📊 グラフ */}
              <div className="flex flex-col gap-4 px-4 lg:px-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">カテゴリ別支出</h2>
                  <Select value={filter} onValueChange={(value) => setFilter(value as "month" | "week" | "day")}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">月</SelectItem>
                      <SelectItem value="week">週</SelectItem>
                      <SelectItem value="day">日</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <SpendingChart filter={filter} entries={entries} />
              </div>

              {/* 📋 カスタムテーブル（場所・金額・日付） */}
              <CustomDataTable data={entries} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
