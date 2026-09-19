"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useApiQuery, useApiMutation } from "@/hooks/use-api"
import { useQueryClient } from "@tanstack/react-query"
import { ATTENDANCE_PATH, ATTENDANCE_QUERY_KEY } from "@/lib/queries/attendance"
import { TEACHER_STUDENTS_PATH, TEACHER_STUDENTS_QUERY_KEY } from "@/lib/queries/teachers"
import { TeacherAttendanceRecord, AttendanceStatus } from "@/types/attendance"
import { TeacherStudent } from "@/types/teacher"
import { Card } from "@/components/ui/card"

import { AttendanceHeader } from "./components/attendance-header"
import { AttendanceTable } from "./components/attendance-table"
import { AttendanceFooter } from "./components/attendance-footer"

export function Content() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const classId = searchParams.get("classId") || ""
  const className = searchParams.get("className") || ""
  const subjectName = searchParams.get("subjectName") || ""
  const teachingAssignmentId = searchParams.get("teachingAssignmentId") || ""
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0]

  // Fetch class roster
  const { data: studentsRes, isLoading: isStudentsLoading } = useApiQuery<any>(
    [...TEACHER_STUDENTS_QUERY_KEY, classId],
    `${TEACHER_STUDENTS_PATH}?classId=${classId}`
  )
  const students: TeacherStudent[] = useMemo(
    () => (Array.isArray(studentsRes) ? studentsRes : studentsRes?.data || []),
    [studentsRes]
  )

  // Fetch existing attendance records
  const { data: existingAttendanceRes, isLoading: isAttendanceLoading } = useApiQuery<any>(
    [...ATTENDANCE_QUERY_KEY, teachingAssignmentId, date],
    `${ATTENDANCE_PATH}?teachingAssignmentId=${teachingAssignmentId}&date=${date}`
  )
  const existingRecords: TeacherAttendanceRecord[] = useMemo(
    () =>
      Array.isArray(existingAttendanceRes)
        ? existingAttendanceRes
        : existingAttendanceRes?.data || [],
    [existingAttendanceRes]
  )

  // Local state draft
  const [attendanceState, setAttendanceState] = useState<
    Record<string, { recordId?: string; status: AttendanceStatus }>
  >({})
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (students.length === 0) return

    const initialState: Record<string, { recordId?: string; status: AttendanceStatus }> = {}
    students.forEach((student) => {
      const foundRecord = existingRecords.find((r) => r.studentId === student.id)
      initialState[student.id] = {
        recordId: foundRecord?.id,
        status: foundRecord?.status || "PRESENT",
      }
    })
    setAttendanceState(initialState)
  }, [students, existingRecords])

  // --- Mutations ---
  const bulkUpdateMutation = useApiMutation<
    any,
    { records: { id: string; status: AttendanceStatus; note?: string }[] }
  >(`${ATTENDANCE_PATH}/bulk-update`, "PATCH")

  const createMutation = useApiMutation<
    any,
    {
      studentId: string
      teachingAssignmentId: string
      date: string
      status: AttendanceStatus
    }
  >(ATTENDANCE_PATH, "POST")

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }))
  }

  const handleMarkAllPresent = () => {
    setAttendanceState((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((stdId) => {
        updated[stdId] = { ...updated[stdId], status: "PRESENT" }
      })
      return updated
    })
  }

  const handleSaveAttendance = async () => {
    setSaveError(null)

    const entries = Object.entries(attendanceState)

    const toUpdate = entries
      .filter(([, item]) => Boolean(item.recordId))
      .map(([, item]) => ({
        id: item.recordId!,
        status: item.status,
      }))

    const toCreate = entries
      .filter(([, item]) => !item.recordId)
      .map(([studentId, item]) => ({
        studentId,
        teachingAssignmentId,
        date,
        status: item.status,
      }))

    try {
      const results = await Promise.allSettled([
        ...(toUpdate.length ? [bulkUpdateMutation.mutateAsync({ records: toUpdate })] : []),
        ...toCreate.map((record) => createMutation.mutateAsync(record)),
      ])

      const failed = results.filter((r) => r.status === "rejected")

      await queryClient.invalidateQueries({ queryKey: ATTENDANCE_QUERY_KEY })

      if (failed.length > 0) {
        setSaveError(
          `${failed.length} of ${results.length} request(s) failed. Some records may not have saved — please review and retry.`
        )
        return
      }

      router.push("/dashboard/attendance")
    } catch (err) {
      console.error("Error saving attendance:", err)
      setSaveError("Something went wrong while saving. Please try again.")
    }
  }

  const isLoading = isStudentsLoading || isAttendanceLoading
  const isSaving = bulkUpdateMutation.isPending || createMutation.isPending

  return (
    <div className="space-y-6 p-6">
      <Card className="rounded-2xl border shadow-sm">
        <AttendanceHeader
          className={className}
          subjectName={subjectName}
          date={date}
          disabled={isLoading || isSaving}
          onMarkAllPresent={handleMarkAllPresent}
        />

        <AttendanceTable
          students={students}
          isLoading={isLoading}
          attendanceState={attendanceState}
          onStatusChange={handleStatusChange}
        />

        <AttendanceFooter
          saveError={saveError}
          isSaving={isSaving}
          isDisabled={isSaving || isLoading || students.length === 0}
          onSave={handleSaveAttendance}
        />
      </Card>
    </div>
  )
}


export default function TakeAttendancePage(){

    return (
        <Suspense>
            <Content />
        </Suspense>
    )
}