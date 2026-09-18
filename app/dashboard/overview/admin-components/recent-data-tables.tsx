"use client"

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
import { Skeleton } from "@/components/ui/skeleton"
import { RecentStudent, RecentPayment } from "@/types/dashboard"

interface RecentDataTablesProps {
  students: RecentStudent[]
  isStudentsLoading: boolean
  payments: RecentPayment[]
  isPaymentsLoading: boolean
}

export function RecentDataTables({
  students,
  isStudentsLoading,
  payments,
  isPaymentsLoading,
}: RecentDataTablesProps) {
  // Format timestamps dynamically
  const formatDate = (isoString: string) => {
    if (!isoString) return "—"
    const date = new Date(isoString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Recent Students */}
      <Card className="rounded-xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Students</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isStudentsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-6"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                    <TableCell className="text-right pr-6"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No recent students found.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium pl-6">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell>{student.className || "N/A"}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                        {student.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 text-muted-foreground text-sm">
                      {formatDate(student.joinedAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Payments */}
      <Card className="rounded-xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-6">Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPaymentsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="pl-6"><Skeleton className="h-4 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="text-right pr-6"><Skeleton className="h-5 w-16 ml-auto rounded-full" /></TableCell>
                  </TableRow>
                ))
              ) : payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    No recent payments found.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium pl-6">{payment.studentName}</TableCell>
                    <TableCell className="font-semibold">
                      {payment.amount.toLocaleString()} {payment.currency}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {payment.status === "PAID" ? (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}