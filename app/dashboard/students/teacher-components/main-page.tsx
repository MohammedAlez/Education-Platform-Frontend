"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import {
  TEACHER_STUDENTS_PATH,
  TEACHER_STUDENTS_QUERY_KEY,
} from "@/lib/queries/teachers"
import { TeacherStudent } from "@/types/teacher"
import { StudentsFilters } from "./students-filters"
import { TeacherStudentsTable } from "./teacher-students-table"

export default function TeacherStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)

  // Build query string params
  const filterParams = new URLSearchParams()
  if (searchQuery.trim()) filterParams.append("search", searchQuery.trim())
  if (selectedClassId) filterParams.append("classId", selectedClassId)

  const queryString = filterParams.toString() ? `?${filterParams.toString()}` : ""

  // Fetch assigned students with dynamic filters
  const { data: studentsRes, isLoading } = useApiQuery<any>(
    [...TEACHER_STUDENTS_QUERY_KEY, searchQuery, selectedClassId],
    `${TEACHER_STUDENTS_PATH}${queryString}`
  )

  const students: TeacherStudent[] = Array.isArray(studentsRes)
    ? studentsRes
    : studentsRes?.data || []

  return (
    <div className="space-y-6 p-2">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Students
        </h1>
        <p className="text-sm text-muted-foreground">
          View roster performance, attendance rates, and grade histories for students in your classes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <StudentsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedClassId={selectedClassId}
        setSelectedClassId={setSelectedClassId}
      />

      {/* Main Table */}
      <TeacherStudentsTable students={students} isLoading={isLoading} />
    </div>
  )
}