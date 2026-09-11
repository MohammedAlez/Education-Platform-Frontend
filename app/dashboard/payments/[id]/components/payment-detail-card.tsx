import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, Calendar, CheckCircle2, DollarSign } from "lucide-react"

interface PaymentDetailCardProps {
  payment: {
    studentName: string
    amount: string
    status: "PAID" | "PENDING" | "OVERDUE"
    method: string
    date: string
  }
}

export function PaymentDetailCard({ payment }: PaymentDetailCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100 px-3 py-1 font-semibold">
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            PAID
          </Badge>
        )
      case "PENDING":
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-100 px-3 py-1 font-semibold">
            PENDING
          </Badge>
        )
      default:
        return (
          <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-100 px-3 py-1 font-semibold">
            OVERDUE
          </Badge>
        )
    }
  }

  return (
    <Card className="shadow-xs border">
      <CardHeader className="border-b bg-muted/20 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Transaction Overview</CardTitle>
          {getStatusBadge(payment.status)}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Student</p>
              <p className="text-base font-semibold text-foreground">{payment.studentName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Amount</p>
              <p className="text-base font-semibold text-primary">{payment.amount}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Payment Method</p>
              <p className="text-base font-semibold text-foreground">{payment.method}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Date</p>
              <p className="text-base font-semibold text-foreground">{payment.date}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}