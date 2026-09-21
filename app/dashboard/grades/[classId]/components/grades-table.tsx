"use client"

import { TeacherStudent } from "@/types/teacher"
import { Skeleton } from "@/components/ui/skeleton"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface GradesTableProps {
  students: TeacherStudent[]
  isLoading: boolean
  gradesState: Record<string, { recordId?: string; score: string }>
  onScoreChange: (studentId: string, value: string) => void
}

export function GradesTable({
  students,
  isLoading,
  gradesState,
  onScoreChange,
}: GradesTableProps) {
  return (
    <CardContent className="p-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="py-3.5 pl-6">Student</TableHead>
            <TableHead className="py-3.5 text-right pr-6">Grade (out of 20)</TableHead>
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
                  <Skeleton className="h-9 w-24 ml-auto rounded-xl" />
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
                  <div className="flex items-center justify-end gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={20}
                      step={0.25}
                      placeholder="--"
                      value={gradesState[student.id]?.score ?? ""}
                      onChange={(e) => onScoreChange(student.id, e.target.value)}
                      className="w-20 text-center font-bold rounded-xl text-base h-9 focus-visible:ring-purple-600"
                    />
                    <span className="text-muted-foreground font-medium text-xs">/ 20</span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CardContent>
  )
}