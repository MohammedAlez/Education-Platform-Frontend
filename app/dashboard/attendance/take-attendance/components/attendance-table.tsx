"use client"

import { TeacherStudent } from "@/types/teacher"
import { AttendanceStatus } from "@/types/attendance"
import { AttendanceStatusSelector } from "./attendance-status-selector"
import { Skeleton } from "@/components/ui/skeleton"
import { CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AttendanceTableProps {
  students: TeacherStudent[]
  isLoading: boolean
  attendanceState: Record<string, { recordId?: string; status: AttendanceStatus }>
  onStatusChange: (studentId: string, status: AttendanceStatus) => void
}

export function AttendanceTable({
  students,
  isLoading,
  attendanceState,
  onStatusChange,
}: AttendanceTableProps) {
  return (
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="py-3.5 pl-6">Student</TableHead>
            <TableHead className="py-3.5 text-right pr-6">Attendance Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell className="py-4 pl-6">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="py-4 text-right pr-6">
                  <Skeleton className="h-8 w-48 ml-auto rounded-full" />
                </TableCell>
              </TableRow>
            ))
          ) : students.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="h-32 text-center text-muted-foreground">
                No students found in this class.
              </TableCell>
            </TableRow>
          ) : (
            students.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/40">
                <TableCell className="font-medium py-3.5 pl-6">
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell className="py-3.5 text-right pr-6">
                  <AttendanceStatusSelector
                    status={attendanceState[student.id]?.status || "PRESENT"}
                    onChange={(status) => onStatusChange(student.id, status)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CardContent>
  )
}