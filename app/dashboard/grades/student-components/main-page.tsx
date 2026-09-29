"use client"

import { useState, useEffect, useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { ClassHeader } from "./class-header"
import { SubjectDetailSheet } from "./subject-detail-sheet"
import { StudentClassSummary, StudentSubjectItem } from "@/types/student-portal"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Award, ChevronRight, Loader2, GraduationCap, BookOpen } from "lucide-react"

export default function StudentGradesPage() {
  const [selectedClassId, setSelectedClassId] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<StudentSubjectItem | null>(null)

  // 1. Fetch Enrolled Classes
  const { data: classesResponse, isLoading: isLoadingClasses } = useApiQuery<
    { data: StudentClassSummary[] } | StudentClassSummary[]
  >(["student-classes"], "/student/me/classes")

  const classList: StudentClassSummary[] = Array.isArray(classesResponse)
    ? classesResponse
    : (classesResponse as any)?.data || []

  useEffect(() => {
    if (classList.length > 0 && !selectedClassId) {
      setSelectedClassId(classList[0].id)
    }
  }, [classList, selectedClassId])

  // 2. Fetch Subjects & Grades for Selected Class
  const { data: subjectsResponse, isLoading: isLoadingSubjects } = useApiQuery<
    { data: StudentSubjectItem[] } | StudentSubjectItem[]
  >(
    ["student-class-subjects", selectedClassId],
    `/student/me/classes/${selectedClassId}/subjects`
  )

  const subjectsList: StudentSubjectItem[] = Array.isArray(subjectsResponse)
    ? subjectsResponse
    : (subjectsResponse as any)?.data || []

  // 3. Dynamic Calculation of Overall Average
  const overallAverage = useMemo(() => {
    const gradedSubjects = subjectsList.filter((s) => s.status !== "No Grades")
    if (gradedSubjects.length === 0) return null

    const total = gradedSubjects.reduce((acc, curr) => acc + curr.averageGrade, 0)
    return (total / gradedSubjects.length).toFixed(1)
  }, [subjectsList])

  if (isLoadingClasses) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-2">
      {/* Top Class Selection Header */}
      <ClassHeader
        classes={classList}
        selectedClassId={selectedClassId}
        onSelectClass={(id) => {
          setSelectedClassId(id)
          setSelectedSubject(null)
        }}
        studentCount={0}
      />

      {/* Hero Banner: Academic Summary */}
      <Card className="border bg-gradient-to-r from-purple-500/10 via-background to-background relative overflow-hidden">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <SparklesIcon className="h-3.5 w-3.5" />
              Academic Summary
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              My Academic Performance
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Real-time calculation of your subject marks and overall academic standing.
            </p>
          </div>

          {/* Overall Average Display Box */}
          <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border shadow-2xs shrink-0 self-start sm:self-auto">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                Overall Average
              </p>
              <p className="text-2xl font-extrabold tracking-tight">
                {overallAverage !== null ? overallAverage : "—"}{" "}
                <span className="text-xs text-muted-foreground font-normal">/ 20</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrolled Subjects Breakdown Table */}
      <Card className="border shadow-2xs">
        <div className="p-5 border-b flex items-center gap-2 font-semibold text-sm">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span>Enrolled Subjects Breakdown</span>
        </div>

        <CardContent className="p-0">
          {isLoadingSubjects ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : subjectsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
              <BookOpen className="h-8 w-8 mb-2 stroke-1" />
              <p className="text-xs">No subjects or grades recorded for this class yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="pl-6">Subject</TableHead>
                  <TableHead className="text-right pr-6">Average Marks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectsList.map((subject, index) => (
                  <TableRow
                    key={`${subject.subjectId}-${index}`}
                    onClick={() => setSelectedSubject(subject)}
                    className="cursor-pointer hover:bg-muted/40 transition-colors group"
                  >
                    <TableCell className="pl-6 font-medium capitalize text-sm sm:text-base group-hover:text-primary transition-colors">
                      {subject.subjectName}
                    </TableCell>
                    <TableCell className="text-right pr-6 font-bold text-sm sm:text-base">
                      <div className="flex items-center justify-end gap-2">
                        {subject.status === "No Grades" ? (
                          <span className="text-muted-foreground font-normal">—</span>
                        ) : (
                          <span>
                            {subject.averageGrade}{" "}
                            <span className="text-xs text-muted-foreground font-normal">
                              / {subject.maxGrade}
                            </span>
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Reused Side Drawer / Sheet Model */}
      <SubjectDetailSheet
        subject={selectedSubject}
        isOpen={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
      />
    </div>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}