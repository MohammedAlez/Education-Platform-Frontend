"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const studentAttendanceLogs = [
  {
    id: "1",
    studentName: "Ahmed Ali",
    className: "Class A",
    present: 18,
    absent: 1,
    late: 1,
  },
  {
    id: "2",
    studentName: "Sara Ahmed",
    className: "Class A",
    present: 19,
    absent: 0,
    late: 1,
  },
  {
    id: "3",
    studentName: "Yassine Mansouri",
    className: "Class B",
    present: 15,
    absent: 4,
    late: 1,
  },
  {
    id: "4",
    studentName: "Lina Hadj",
    className: "Class C",
    present: 20,
    absent: 0,
    late: 0,
  },
]

export function StudentAttendanceTable() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Student Record Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead className="text-center">Present</TableHead>
              <TableHead className="text-center">Absent</TableHead>
              <TableHead className="text-center pr-6">Late</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentAttendanceLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/30">
                <TableCell className="font-medium pl-6">
                  {log.studentName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                    {log.className}
                  </Badge>
                </TableCell>
                <TableCell className="text-center font-semibold text-emerald-600 dark:text-emerald-400">
                  {log.present}
                </TableCell>
                <TableCell className="text-center font-semibold text-rose-500 dark:text-rose-400">
                  {log.absent}
                </TableCell>
                <TableCell className="text-center font-semibold text-amber-500 dark:text-amber-400 pr-6">
                  {log.late}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}