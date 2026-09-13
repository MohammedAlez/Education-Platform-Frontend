import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PaymentActionsMenu } from "./payment-actions-menu"
import { PaymentItem } from "@/types/payment"

interface PaymentsTableProps {
  payments: PaymentItem[]
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return (
          <Badge variant="secondary" className="bg-emerald-100/70 text-emerald-700 font-medium hover:bg-emerald-100 border-emerald-200">
            Paid
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="secondary" className="bg-amber-100/70 text-amber-700 font-medium hover:bg-amber-100 border-amber-200">
            Pending
          </Badge>
        )
      case "OVERDUE":
        return (
          <Badge variant="secondary" className="bg-rose-100/70 text-rose-700 font-medium hover:bg-rose-100 border-rose-200">
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatMethod = (method?: string | null) => {
    if (!method) return "—"
    if (method === "BANK_TRANSFER") return "Bank Transfer"
    return method.charAt(0) + method.slice(1).toLowerCase()
  }

  return (
    <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="font-semibold text-xs pl-6">Student</TableHead>
            <TableHead className="font-semibold text-xs">Amount</TableHead>
            <TableHead className="font-semibold text-xs">Method</TableHead>
            <TableHead className="font-semibold text-xs">Status</TableHead>
            <TableHead className="w-[80px] text-right font-semibold text-xs pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((p) => {
              const studentName = p.student
                ? `${p.student.firstName} ${p.student.lastName}`
                : "Unknown Student"

              return (
                <TableRow key={p.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-sm pl-6">
                    {studentName}
                  </TableCell>
                  <TableCell className="font-bold text-purple-600 dark:text-purple-400">
                    {Number(p.amount).toLocaleString()} DA
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatMethod(p.paymentMethod)}
                  </TableCell>
                  <TableCell>{getStatusBadge(p.status)}</TableCell>
                  <TableCell className="text-right pr-6">
                    <PaymentActionsMenu payment={p} />
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                No payment records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}