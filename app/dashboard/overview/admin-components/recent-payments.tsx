import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentPayments = [
  { student: "Ahmed Ali", amount: "15,000 DA", status: "Paid" },
  { student: "Sara Mohamed", amount: "15,000 DA", status: "Pending" },
  { student: "Youssef Karim", amount: "20,000 DA", status: "Paid" },
  { student: "Lina Mahmoud", amount: "15,000 DA", status: "Paid" },
]

export function RecentPayments() {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentPayments.map((payment, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{payment.student}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      payment.status === "Paid"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}