"use client"

import { useState, useEffect } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { ClassHeader } from "./class-header" // Reused class cards header component
import { SubjectCard } from "./subject-card"
import { SubjectDetailSheet } from "./subject-detail-sheet"
import { StudentClassSummary, StudentSubjectItem } from "@/types/student-portal"
import { Loader2, BookOpen } from "lucide-react"

export function StudentSubjectsMainPage() {
  const [selectedClassId, setSelectedClassId] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<StudentSubjectItem | null>(null)

  // 1. Fetch Enrolled Classes
  const { data: classesResponse, isLoading: isLoadingClasses } = useApiQuery<
    { data: StudentClassSummary[] } | StudentClassSummary[]
  >(["student-classes"], "/student/me/classes")

  const classList: StudentClassSummary[] = Array.isArray(classesResponse)
    ? classesResponse
    : (classesResponse as any)?.data || []

  // Auto-select first class on initial render
  useEffect(() => {
    if (classList.length > 0 && !selectedClassId) {
      setSelectedClassId(classList[0].id)
    }
  }, [classList, selectedClassId])

  // 2. Fetch Subjects for Selected Class
  const { data: subjectsResponse, isLoading: isLoadingSubjects } = useApiQuery<
    { data: StudentSubjectItem[] } | StudentSubjectItem[]
  >(
    ["student-class-subjects", selectedClassId],
    `/student/me/classes/${selectedClassId}/subjects`,
  )

  const subjectsList: StudentSubjectItem[] = Array.isArray(subjectsResponse)
    ? subjectsResponse
    : (subjectsResponse as any)?.data || []

  if (isLoadingClasses) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-2">
      {/* Top Enrolled Classes Selection Cards */}
      <ClassHeader
        classes={classList}
        selectedClassId={selectedClassId}
        onSelectClass={(id) => {
          setSelectedClassId(id)
          setSelectedSubject(null) // Reset drawer state on class switch
        }}
        studentCount={0}
      />

      <div className="pt-2">
        <h1 className="text-2xl font-bold tracking-tight">My Subjects</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Select a subject to view your detailed grades breakdown.
        </p>
      </div>

      {isLoadingSubjects ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : subjectsList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed">
          <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No subjects found for this class.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjectsList.map((subject, index) => (
            <SubjectCard
              key={`${subject.subjectId}-${subject.teacher.id}-${index}`}
              subject={subject}
              onClick={(sub) => setSelectedSubject(sub)}
            />
          ))}
        </div>
      )}

      {/* Right Drawer / Sheet Model */}
      <SubjectDetailSheet
        subject={selectedSubject}
        isOpen={!!selectedSubject}
        onClose={() => setSelectedSubject(null)}
      />
    </div>
  )
}