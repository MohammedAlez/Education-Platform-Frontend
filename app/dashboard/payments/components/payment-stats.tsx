import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { PaymentItem } from "@/types/payment"

interface PaymentStatsProps {
  payments: PaymentItem[]
}

export function PaymentStats({ payments }: PaymentStatsProps) {
  const totalExpected = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0)
  
  const totalPaid = payments
    .filter((p) => p.status === "PAID")
    .reduce((acc, p) => acc + Number(p.amount || 0), 0)

  const totalPending = payments
    .filter((p) => p.status === "PENDING")
    .reduce((acc, p) => acc + Number(p.amount || 0), 0)

  const totalOverdue = payments
    .filter((p) => p.status === "OVERDUE")
    .reduce((acc, p) => acc + Number(p.amount || 0), 0)

  const formatCurrency = (val: number) => `${val.toLocaleString()} DA`

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Expected */}
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Expected</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">
              {formatCurrency(totalExpected)}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Paid */}
      <Card className="border shadow-xs bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Paid</p>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">
              {formatCurrency(totalPaid)}
            </p>
          </div>
          <div className="p-3 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Pending */}
      <Card className="border shadow-xs bg-amber-50/40 dark:bg-amber-950/10 border-amber-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 mt-1">
              {formatCurrency(totalPending)}
            </p>
          </div>
          <div className="p-3 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Overdue */}
      <Card className="border shadow-xs bg-rose-50/40 dark:bg-rose-950/10 border-rose-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 mt-1">
              {formatCurrency(totalOverdue)}
            </p>
          </div>
          <div className="p-3 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}