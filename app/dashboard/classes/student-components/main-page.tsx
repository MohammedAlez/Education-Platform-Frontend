"use client"

import { useState, useEffect } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { ClassHeader } from "./class-header"
import { ClassSubjects } from "./class-subjects"
import { ClassTeachers } from "./class-teachers"
import {
  StudentClassSummary,
  StudentClassDetail,
} from "@/types/student-portal"
import { Loader2 } from "lucide-react"

export function StudentMyClassPage() {
  const [selectedClassId, setSelectedClassId] = useState<string>("")

  // Fetch list of enrolled classes
  const { data: classesResponse, isLoading: isLoadingClasses } = useApiQuery<
    { data: StudentClassSummary[] } | StudentClassSummary[]
  >(["student-classes"], "/student/me/classes")

  const classList: StudentClassSummary[] = Array.isArray(classesResponse)
    ? classesResponse
    : (classesResponse as any)?.data || []

  // Auto-select first active class on load
  useEffect(() => {
    if (classList.length > 0 && !selectedClassId) {
      setSelectedClassId(classList[0].id)
    }
  }, [classList, selectedClassId])

  // Fetch details for the selected class
  const { data: classDetailResponse, isLoading: isLoadingDetails } =
    useApiQuery<{ data: StudentClassDetail } | StudentClassDetail>(
      ["student-class-detail", selectedClassId],
      `/student/me/classes/${selectedClassId}`,
    //   { enabled: !!selectedClassId }
    )

  const classDetail: StudentClassDetail | null = (classDetailResponse as any)
    ?.data
    ? (classDetailResponse as any).data
    : (classDetailResponse as StudentClassDetail) || null

  if (isLoadingClasses || (selectedClassId && isLoadingDetails)) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (classList.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed rounded-lg my-6">
        <h3 className="text-base font-semibold">No Class Enrolled</h3>
        <p className="text-xs text-muted-foreground mt-1">
          You are currently not enrolled in any active classes.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-2">
      <ClassHeader
        classes={classList}
        selectedClassId={selectedClassId}
        onSelectClass={(id) => setSelectedClassId(id!)}
        studentCount={classDetail?.studentCount || 0}
      />
      <ClassSubjects subjects={classDetail?.subjects || []} />
      <ClassTeachers teachers={classDetail?.teachers || []} />
    </div>
  )
}