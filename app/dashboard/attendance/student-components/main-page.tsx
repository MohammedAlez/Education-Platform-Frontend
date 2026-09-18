"use client"

import { useState } from "react"
import { AttendanceStats } from "./attendance-stats"
import { AttendanceFilters } from "./attendance-filters"
import {
  AttendanceHistoryTable,
  AttendanceRecord,
} from "./attendance-history-table"

const rawAttendanceData: AttendanceRecord[] = [
  { id: "1", date: "Sep 10", subject: "Mathematics", status: "Present" },
  { id: "2", date: "Sep 9", subject: "Physics", status: "Present" },
  { id: "3", date: "Sep 8", subject: "Mathematics", status: "Absent" },
  { id: "4", date: "Sep 7", subject: "Computer Science", status: "Present" },
  { id: "5", date: "Sep 6", subject: "Physics", status: "Late" },
]

export default function StudentAttendancePage() {
  const [monthFilter, setMonthFilter] = useState<string | null>("all")
  const [subjectFilter, setSubjectFilter] = useState<string | null>("all")
  const [statusFilter, setStatusFilter] = useState<string | null>("all")

  // Filter Logic
  const filteredRecords = rawAttendanceData.filter((record) => {
    const matchesSubject =
      subjectFilter === "all" ||
      (subjectFilter === "math" && record.subject === "Mathematics") ||
      (subjectFilter === "physics" && record.subject === "Physics") ||
      (subjectFilter === "cs" && record.subject === "Computer Science")

    const matchesStatus =
      statusFilter === "all" ||
      record.status.toLowerCase() === statusFilter?.toLowerCase()

    return matchesSubject && matchesStatus
  })

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Attendance</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your session attendance history and overall presence statistics.
        </p>
      </div>

      <AttendanceStats rate="94%" presentCount={92} absentCount={5} lateCount={3} />

      <AttendanceHistoryTable
        records={filteredRecords}
        filterComponent={
          <AttendanceFilters
            month={monthFilter}
            setMonth={setMonthFilter}
            subject={subjectFilter}
            setSubject={setSubjectFilter}
            status={statusFilter}
            setStatus={setStatusFilter}
          />
        }
      />
    </div>
  )
}