"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export interface AttendanceRecord {
  id: string
  date: string
  subject: string
  status: "Present" | "Absent" | "Late"
}

interface AttendanceHistoryTableProps {
  records: AttendanceRecord[]
  filterComponent?: React.ReactNode
}

export function AttendanceHistoryTable({
  records,
  filterComponent,
}: AttendanceHistoryTableProps) {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <CardTitle className="text-base font-semibold">Attendance History</CardTitle>
        {filterComponent}
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6">Date</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium pl-6 text-xs sm:text-sm">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">{row.subject}</TableCell>
                  <TableCell className="text-right pr-6">
                    {row.status === "Present" && (
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/60">
                        Present
                      </Badge>
                    )}
                    {row.status === "Absent" && (
                      <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/60">
                        Absent
                      </Badge>
                    )}
                    {row.status === "Late" && (
                      <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200/60">
                        Late
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground text-xs sm:text-sm">
                  No attendance records found matching selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}