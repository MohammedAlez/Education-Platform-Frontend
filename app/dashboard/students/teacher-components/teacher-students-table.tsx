"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { TeacherStudent } from "@/types/teacher"

interface TeacherStudentsTableProps {
  students: TeacherStudent[]
  isLoading: boolean
}

export function TeacherStudentsTable({ students, isLoading }: TeacherStudentsTableProps) {
  return (
    <Card className="rounded-xl border shadow-sm">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="py-3.5 pl-6">Student</TableHead>
              <TableHead className="py-3.5">Class</TableHead>
              <TableHead className="py-3.5">Attendance Rate</TableHead>
              <TableHead className="py-3.5 text-right pr-6">Academic Average</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-4 pl-6"><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell className="py-4"><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell className="py-4"><Skeleton className="h-5 w-12 rounded-full" /></TableCell>
                  <TableCell className="py-4 text-right pr-6"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No enrolled students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id} className="hover:bg-muted/40">
                  <TableCell className="font-medium py-3.5 pl-6">
                    {student.firstName} {student.lastName}
                  </TableCell>

                  <TableCell className="py-3.5">
                    <Badge
                      variant="outline"
                      className="text-purple-600 border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 font-normal"
                    >
                      {student.class?.name || "N/A"}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-3.5">
                    <Badge
                      className="bg-sky-50 text-sky-700 hover:bg-sky-50 border-sky-100 dark:bg-sky-950/30 dark:border-sky-900/40"
                    >
                      {student.attendanceRate}%
                    </Badge>
                  </TableCell>

                  <TableCell className="font-semibold text-purple-600 text-right py-3.5 pr-6">
                    {Number(student.academicAverage).toFixed(1)} / 20
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}