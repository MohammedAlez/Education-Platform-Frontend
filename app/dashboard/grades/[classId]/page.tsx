"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useApiQuery, useApiMutation } from "@/hooks/use-api"
import { useQueryClient } from "@tanstack/react-query"
import { TEACHER_STUDENTS_PATH, TEACHER_STUDENTS_QUERY_KEY } from "@/lib/queries/teachers"
import { GRADES_PATH, GRADES_QUERY_KEY } from "@/lib/queries/grades"
import { TeacherStudent } from "@/types/teacher"
import { Card } from "@/components/ui/card"

import { GradesHeader } from "./components/grades-header"
import { GradesTable } from "./components/grades-table"
import { GradesFooter } from "./components/grades-footer"

interface GradeRecord {
  id?: string
  studentId: string
  value: number | null
}

export function Content() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const classId = (params.classId as string) || ""
  const className = searchParams.get("className") || ""
  const subjectName = searchParams.get("subjectName") || ""
  const teachingAssignmentId = searchParams.get("teachingAssignmentId") || ""
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0]
  const type = searchParams.get("type") || "EXAM"

  // Fetch student roster
  const { data: studentsRes, isLoading: isStudentsLoading } = useApiQuery<any>(
    [...TEACHER_STUDENTS_QUERY_KEY, classId],
    `${TEACHER_STUDENTS_PATH}?classId=${classId}`
  )
  const students: TeacherStudent[] = useMemo(
    () => (Array.isArray(studentsRes) ? studentsRes : studentsRes?.data || []),
    [studentsRes]
  )

  // Fetch existing grade records
  const { data: existingGradesRes, isLoading: isGradesLoading } = useApiQuery<any>(
    [...GRADES_QUERY_KEY, teachingAssignmentId],
    `${GRADES_PATH}?teachingAssignmentId=${teachingAssignmentId}`
  )
  const existingRecords: GradeRecord[] = useMemo(
    () => (Array.isArray(existingGradesRes) ? existingGradesRes : existingGradesRes?.data || []),
    [existingGradesRes]
  )

  // Local state draft
  const [gradesState, setGradesState] = useState<
    Record<string, { recordId?: string; score: string }>
  >({})
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (students.length === 0) return

    const initialState: Record<string, { recordId?: string; score: string }> = {}
    students.forEach((student) => {
      const foundRecord = existingRecords.find((r) => r.studentId === student.id)
      initialState[student.id] = {
        recordId: foundRecord?.id,
        score:
          foundRecord?.value !== undefined && foundRecord?.value !== null
            ? String(foundRecord.value)
            : "",
      }
    })
    setGradesState(initialState)
  }, [students, existingRecords])

  // --- Mutations ---
  const bulkUpdateMutation = useApiMutation<
    any,
    {
      records: {
        id: string
        value: number
        maxValue?: number
        type?: string
        note?: string
      }[]
    }
  >(`${GRADES_PATH}/bulk-update`, "PATCH")

  const createMutation = useApiMutation<
    any,
    {
      studentId: string
      teachingAssignmentId: string
      type: string
      value: number
      maxValue: number
      date: string
    }
  >(GRADES_PATH, "POST")

  const handleScoreChange = (studentId: string, value: string) => {
    setGradesState((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], score: value },
    }))
  }

  // Calculate live average
  const classBatchAverage = useMemo(() => {
    const scores = Object.values(gradesState)
      .map((item) => parseFloat(item.score))
      .filter((score) => !isNaN(score))

    if (scores.length === 0) return null
    const sum = scores.reduce((acc, curr) => acc + curr, 0)
    return (sum / scores.length).toFixed(1)
  }, [gradesState])

  const handleSaveGrades = async () => {
    setSaveError(null)

    const entries = Object.entries(gradesState).filter(
      ([, item]) => item.score.trim() !== "" && !isNaN(parseFloat(item.score))
    )

    // Existing records -> PATCH /api/grades/bulk-update
    const toUpdate = entries
      .filter(([, item]) => Boolean(item.recordId))
      .map(([, item]) => ({
        id: item.recordId!,
        value: parseFloat(item.score),
        maxValue: 20,
        type,
      }))

    // New records -> POST /api/grades for each
    const toCreate = entries
      .filter(([, item]) => !item.recordId)
      .map(([studentId, item]) => ({
        studentId,
        teachingAssignmentId,
        type,
        value: parseFloat(item.score),
        maxValue: 20,
        date,
      }))

    try {
      const results = await Promise.allSettled([
        ...(toUpdate.length ? [bulkUpdateMutation.mutateAsync({ records: toUpdate })] : []),
        ...toCreate.map((record) => createMutation.mutateAsync(record)),
      ])

      const failed = results.filter((r) => r.status === "rejected")

      await queryClient.invalidateQueries({ queryKey: GRADES_QUERY_KEY })

      if (failed.length > 0) {
        setSaveError(
          `${failed.length} of ${results.length} request(s) failed. Some records may not have saved — please review and retry.`
        )
        return
      }

      router.push("/dashboard/grades")
    } catch (err: any) {
      console.error("Error saving grades:", err)
      setSaveError("Something went wrong while saving. Please try again.")
    }
  }

  const isLoading = isStudentsLoading || isGradesLoading
  const isSaving = bulkUpdateMutation.isPending || createMutation.isPending

  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-2xl border shadow-sm">
        <GradesHeader className={className} subjectName={subjectName} />

        <GradesTable
          students={students}
          isLoading={isLoading}
          gradesState={gradesState}
          onScoreChange={handleScoreChange}
        />

        <GradesFooter
          classBatchAverage={classBatchAverage}
          saveError={saveError}
          isSaving={isSaving}
          isDisabled={isSaving || isLoading || students.length === 0}
          onSave={handleSaveGrades}
        />
      </Card>
    </div>
  )
}

export default function ClassGradesPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}