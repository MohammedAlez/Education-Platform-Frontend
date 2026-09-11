"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  TeacherStudentDetailsSheet,
  TeacherScopedStudent,
} from "./teacher-student-details-sheet"

const teacherScopedStudents: TeacherScopedStudent[] = [
  {
    id: "stu-1",
    name: "Ahmed Ali",
    className: "Class A",
    attendance: "94%",
    average: "16.2 / 20",
    recentGrades: [
      { subject: "Mathematics", type: "Test", grade: "16 / 20", date: "09/10/2026" },
      { subject: "Mathematics", type: "Homework", grade: "17 / 20", date: "09/05/2026" },
    ],
    attendanceLogs: [
      { date: "10/09/2026", subject: "Mathematics", status: "PRESENT" },
      { date: "09/09/2026", subject: "Mathematics", status: "PRESENT" },
    ],
  },
  {
    id: "stu-2",
    name: "Sara Ahmed",
    className: "Class A",
    attendance: "98%",
    average: "17.4 / 20",
    recentGrades: [
      { subject: "Mathematics", type: "Test", grade: "18 / 20", date: "09/10/2026" },
      { subject: "Mathematics", type: "Homework", grade: "17 / 20", date: "09/05/2026" },
    ],
    attendanceLogs: [
      { date: "10/09/2026", subject: "Mathematics", status: "PRESENT" },
      { date: "09/09/2026", subject: "Mathematics", status: "PRESENT" },
    ],
  },
  {
    id: "stu-3",
    name: "Mohammed Ali",
    className: "Class B",
    attendance: "85%",
    average: "12.0 / 20",
    recentGrades: [
      { subject: "Mathematics", type: "Test", grade: "12 / 20", date: "09/10/2026" },
    ],
    attendanceLogs: [
      { date: "10/09/2026", subject: "Mathematics", status: "ABSENT" },
    ],
  },
  {
    id: "stu-4",
    name: "Youcef",
    className: "Class B",
    attendance: "91%",
    average: "15.0 / 20",
    recentGrades: [
      { subject: "Mathematics", type: "Test", grade: "15 / 20", date: "09/10/2026" },
    ],
    attendanceLogs: [
      { date: "10/09/2026", subject: "Mathematics", status: "LATE" },
    ],
  },
]

export function TeacherStudentsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<TeacherScopedStudent | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const filteredStudents = teacherScopedStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRowClick = (student: TeacherScopedStudent) => {
    setSelectedStudent(student)
    setIsSheetOpen(true)
  }

  return (
    <>
      <Card className="shadow-xs border">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-base font-semibold">Enrolled Students List</CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search student or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="pl-6">Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Attendance Rate</TableHead>
                <TableHead className="text-right pr-6">Academic Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    onClick={() => handleRowClick(student)}
                    className="cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium pl-6 text-foreground">
                      {student.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 font-normal"
                      >
                        {student.className}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-normal"
                      >
                        {student.attendance}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary pr-6">
                      {student.average}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No matching students found in your assigned classes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TeacherStudentDetailsSheet
        student={selectedStudent}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </>
  )
}