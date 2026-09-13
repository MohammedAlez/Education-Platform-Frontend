"use client"

import { useState, useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { PAYMENTS_QUERY_KEY, PAYMENTS_PATH } from "@/lib/queries/payments"
import { PaymentItem } from "@/types/payment"
import { PaymentStats } from "./payment-stats"
import { PaymentsTable } from "./payments-table"
import { CreatePaymentDialog } from "./create-payment-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Plus } from "lucide-react"

interface PaymentsGridProps {
  initialPayments: PaymentItem[]
}

export function PaymentsGrid({ initialPayments }: PaymentsGridProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>("all")
  const [monthFilter, setMonthFilter] = useState<string | null>("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data: responseData } = useApiQuery<{ data: PaymentItem[] } | PaymentItem[]>(
    PAYMENTS_QUERY_KEY,
    PAYMENTS_PATH
  )

  const payments: PaymentItem[] = Array.isArray(responseData)
    ? responseData
    : (responseData as any)?.data || initialPayments

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const studentName = p.student
        ? `${p.student.firstName} ${p.student.lastName}`.toLowerCase()
        : ""
      const matchesSearch = studentName.includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || p.status === statusFilter

      let matchesMonth = true
      if (monthFilter !== "all") {
        const dueDateMonth = new Date(p.dueDate).getMonth()
        matchesMonth = dueDateMonth === Number(monthFilter)
      }

      return matchesSearch && matchesStatus && matchesMonth
    })
  }, [payments, search, statusFilter, monthFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor and manually update tuition fees, pending invoices, and balances.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Create Invoice
        </Button>
      </div>

      {/* Stats Cards */}
      <PaymentStats payments={payments} />

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search student..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="all-status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="OVERDUE">Overdue</SelectItem>
            </SelectContent>
          </Select>

          {/* Month Filter */}
          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="8">September</SelectItem>
              <SelectItem value="9">October</SelectItem>
              <SelectItem value="10">November</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <PaymentsTable payments={filteredPayments} />

      {/* Create Dialog */}
      <CreatePaymentDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}