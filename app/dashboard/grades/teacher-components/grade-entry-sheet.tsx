"use client"

import { useState } from "react"
import { CalendarIcon, Save, Sparkles, CheckCircle2 } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface StudentGradeItem {
  id: string
  name: string
  grade: string
}

const initialStudents: StudentGradeItem[] = [
  { id: "1", name: "Ahmed Ali", grade: "16" },
  { id: "2", name: "Sara Ahmed", grade: "18" },
  { id: "3", name: "Mohammed Ali", grade: "12" },
  { id: "4", name: "Youcef", grade: "15" },
  { id: "5", name: "Lina Hadj", grade: "17" },
  { id: "6", name: "Khaled Mansouri", grade: "14" },
]

export function GradeEntrySheet() {
  const [selectedClass, setSelectedClass] = useState<string | null>("class-a")
  const [selectedSubject, setSelectedSubject] = useState<string | null>("math")
  const [gradeType, setGradeType] = useState<string | null>("test")
  const [students, setStudents] = useState<StudentGradeItem[]>(initialStudents)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleGradeChange = (id: string, value: string) => {
    // Validate numerical input max 20
    if (value !== "" && (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 20)) {
      return
    }
    setStudents((prev) =>
      prev.map((student) => (student.id === id ? { ...student, grade: value } : student))
    )
  }

  const handleSave = () => {
    setIsSaving(true)
    setSaveSuccess(false)
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 600)
  }

  // Calculate live average
  const validGrades = students
    .map((s) => parseFloat(s.grade))
    .filter((g) => !isNaN(g))
  const average =
    validGrades.length > 0
      ? (validGrades.reduce((a, b) => a + b, 0) / validGrades.length).toFixed(1)
      : "0.0"

  return (
    <Card className="shadow-xs border">
      <CardHeader className="border-b bg-muted/20 pb-6">
        <CardTitle className="text-lg font-bold">Gradebook Entry</CardTitle>

        {/* Filter Controls Bar */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Grade Type</label>
            <Select value={gradeType} onValueChange={setGradeType}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="test">Test</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
                <SelectItem value="homework">Homework</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground">Date</label>
            <div className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm font-medium shadow-2xs">
              <span>10/09/2026</span>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead className="text-right pr-6 w-[200px]">Grade (out of 20)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/20">
                <TableCell className="font-medium pl-6 text-foreground">
                  {student.name}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      value={student.grade}
                      onChange={(e) => handleGradeChange(student.id, e.target.value)}
                      className="w-24 text-right font-semibold text-base focus-visible:ring-primary"
                    />
                    <span className="text-xs text-muted-foreground font-medium w-8 text-left">
                      / 20
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t bg-muted/10 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Class Batch Average: <strong className="text-foreground">{average} / 20</strong></span>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4" />
              Grades saved successfully
            </span>
          )}
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 px-6"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Grades"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}