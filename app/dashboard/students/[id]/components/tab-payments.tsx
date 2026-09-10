import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const payments = [
  { month: "September", amount: "15,000 DA", status: "Paid" },
  { month: "October", amount: "15,000 DA", status: "Pending" },
]

export function TabPayments() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Payment History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Month</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.month}>
                <TableCell className="font-medium pl-6">{p.month}</TableCell>
                <TableCell>{p.amount}</TableCell>
                <TableCell className="text-right pr-6">
                  <Badge
                    variant="outline"
                    className={
                      p.status === "Paid"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    }
                  >
                    {p.status}
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