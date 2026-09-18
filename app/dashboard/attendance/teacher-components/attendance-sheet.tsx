"use client"

import { useState } from "react"
import { CalendarIcon, CheckCheck, Save, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE"

interface StudentAttendance {
  id: string
  name: string
  status: AttendanceStatus
}

const initialStudents: StudentAttendance[] = [
  { id: "1", name: "Ahmed Ali", status: "PRESENT" },
  { id: "2", name: "Sara Ahmed", status: "PRESENT" },
  { id: "3", name: "Mohammed Ali", status: "ABSENT" },
  { id: "4", name: "Youcef", status: "LATE" },
  { id: "5", name: "Lina Hadj", status: "PRESENT" },
  { id: "6", name: "Khaled Mansouri", status: "PRESENT" },
]

export function AttendanceSheet() {
  const [selectedClass, setSelectedClass] = useState<string | null>("class-a")
  const [selectedSubject, setSelectedSubject] = useState<string | null>("math")
  const [students, setStudents] = useState<StudentAttendance[]>(initialStudents)
  const [isSaving, setIsSaving] = useState(false)

  // Quick state toggle
  const toggleStatus = (id: string, currentStatus: AttendanceStatus) => {
    const nextStatus: Record<AttendanceStatus, AttendanceStatus> = {
      PRESENT: "LATE",
      LATE: "ABSENT",
      ABSENT: "PRESENT",
    }
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: nextStatus[currentStatus] } : student
      )
    )
  }

  // Set explicit status
  const setExplicitStatus = (id: string, newStatus: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    )
  }

  // Bulk operation
  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((student) => ({ ...student, status: "PRESENT" })))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 600)
  }

  return (
    <Card className="shadow-xs border">
      <CardHeader className="border-b bg-muted/20 pb-6">
        <CardTitle className="text-lg font-bold">Take Attendance</CardTitle>

        {/* Filter Controls Bar */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class-a">Class A</SelectItem>
                <SelectItem value="class-b">Class B</SelectItem>
                <SelectItem value="class-c">Class C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Date</label>
            <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm font-medium shadow-2xs">
              <span>September 10, 2026</span>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead className="text-right pr-6">Attendance Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/20">
                <TableCell className="font-medium pl-6 text-foreground">
                  {student.name}
                </TableCell>

                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-1.5">
                    {/* Quick Cycle Badge */}
                    <button
                      type="button"
                      onClick={() => toggleStatus(student.id, student.status)}
                      className="focus:outline-none"
                    >
                      {student.status === "PRESENT" && (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 gap-1.5 px-3 py-1 cursor-pointer transition-all border-emerald-200 dark:border-emerald-800">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          Present
                        </Badge>
                      )}

                      {student.status === "ABSENT" && (
                        <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-300 gap-1.5 px-3 py-1 cursor-pointer transition-all border-rose-200 dark:border-rose-800">
                          <span className="h-2 w-2 rounded-full bg-rose-500" />
                          Absent
                        </Badge>
                      )}

                      {student.status === "LATE" && (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-300 gap-1.5 px-3 py-1 cursor-pointer transition-all border-amber-200 dark:border-amber-800">
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          Late
                        </Badge>
                      )}
                    </button>

                    {/* Precise One-Touch Override Buttons */}
                    <div className="ml-2 hidden sm:flex items-center gap-1 border-l pl-2">
                      <Button
                        size="xs"
                        variant={student.status === "PRESENT" ? "default" : "ghost"}
                        onClick={() => setExplicitStatus(student.id, "PRESENT")}
                        className={`h-7 w-7 p-0 ${student.status === "PRESENT" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "text-muted-foreground"}`}
                        title="Mark Present"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="xs"
                        variant={student.status === "LATE" ? "default" : "ghost"}
                        onClick={() => setExplicitStatus(student.id, "LATE")}
                        className={`h-7 w-7 p-0 ${student.status === "LATE" ? "bg-amber-500 text-white hover:bg-amber-600" : "text-muted-foreground"}`}
                        title="Mark Late"
                      >
                        <Clock className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="xs"
                        variant={student.status === "ABSENT" ? "default" : "ghost"}
                        onClick={() => setExplicitStatus(student.id, "ABSENT")}
                        className={`h-7 w-7 p-0 ${student.status === "ABSENT" ? "bg-rose-600 text-white hover:bg-rose-700" : "text-muted-foreground"}`}
                        title="Mark Absent"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/10 p-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleMarkAllPresent}
          className="gap-2 text-xs font-semibold"
        >
          <CheckCheck className="h-4 w-4 text-emerald-600" />
          Mark All Present
        </Button>

        <Button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2 px-6"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Attendance"}
        </Button>
      </CardFooter>
    </Card>
  )
}