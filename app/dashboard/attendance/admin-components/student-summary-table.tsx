import { useMemo } from "react"
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
import { AttendanceRecord, StudentAttendanceSummary } from "@/types/attendance"

interface StudentSummaryTableProps {
  records: AttendanceRecord[]
}

export function StudentSummaryTable({ records }: StudentSummaryTableProps) {
  // Aggregate student attendance counts
  const studentSummaries = useMemo(() => {
    const map = new Map<string, StudentAttendanceSummary>()

    records.forEach((record) => {
      const studentId = record.studentId
      const studentName = record.student
        ? `${record.student.firstName} ${record.student.lastName}`
        : "Unknown Student"
      const className = record.teachingAssignment?.class?.name || "N/A"

      if (!map.has(studentId)) {
        map.set(studentId, {
          studentId,
          studentName,
          className,
          presentCount: 0,
          absentCount: 0,
          lateCount: 0,
        })
      }

      const summary = map.get(studentId)!
      if (record.status === "PRESENT") summary.presentCount += 1
      if (record.status === "ABSENT") summary.absentCount += 1
      if (record.status === "LATE") summary.lateCount += 1
    })

    return Array.from(map.values())
  }, [records])

  return (
    <Card className="border shadow-xs overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold">Student Record Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="font-semibold text-xs pl-6">Student</TableHead>
              <TableHead className="font-semibold text-xs">Class</TableHead>
              <TableHead className="font-semibold text-xs">Present</TableHead>
              <TableHead className="font-semibold text-xs">Absent</TableHead>
              <TableHead className="font-semibold text-xs pr-6">Late</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentSummaries.length > 0 ? (
              studentSummaries.map((student) => (
                <TableRow key={student.studentId} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-sm pl-6">
                    {student.studentName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100/70 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300 font-medium"
                    >
                      {student.className}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-emerald-600 dark:text-emerald-400">
                    {student.presentCount}
                  </TableCell>
                  <TableCell className="font-bold text-rose-600 dark:text-rose-400">
                    {student.absentCount}
                  </TableCell>
                  <TableCell className="font-bold text-amber-600 dark:text-amber-400 pr-6">
                    {student.lateCount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}