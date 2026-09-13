"use client"

import { useState, useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { ATTENDANCE_QUERY_KEY, ATTENDANCE_PATH } from "@/lib/queries/attendance"
import { AttendanceRecord } from "@/types/attendance"
import { AttendanceStats } from "./attendance-stats"
import { AttendanceByClass } from "./attendance-by-class"
import { StudentSummaryTable } from "./student-summary-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "lucide-react"

interface AttendanceOverviewGridProps {
  initialRecords: AttendanceRecord[]
}

export function AttendanceOverviewGrid({ initialRecords }: AttendanceOverviewGridProps) {
  const [dateFilter, setDateFilter] = useState<string | null>("all")
  const [selectedClass, setSelectedClass] = useState<string | null>("all")
  const [selectedSubject, setSelectedSubject] = useState<string | null>("all")

  const { data: responseData } = useApiQuery<{ data: AttendanceRecord[] } | AttendanceRecord[]>(
    ATTENDANCE_QUERY_KEY,
    ATTENDANCE_PATH
  )

  const records: AttendanceRecord[] = Array.isArray(responseData)
    ? responseData
    : (responseData as any)?.data || initialRecords

  // Extract unique classes for filter
  const classOptions = useMemo(() => {
    const map = new Map<string, string>()
    records.forEach((r) => {
      const cls = r.teachingAssignment?.class
      if (cls?.id && cls?.name) {
        map.set(cls.id, cls.name)
      }
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [records])

  // Extract unique subjects for filter
  const subjectOptions = useMemo(() => {
    const map = new Map<string, string>()
    records.forEach((r) => {
      const sub = r.teachingAssignment?.subject
      if (sub?.id && sub?.name) {
        map.set(sub.id, sub.name)
      }
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [records])

  // Filter records based on selected dropdown options
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesClass =
        selectedClass === "all" || r.teachingAssignment?.class?.id === selectedClass

      const matchesSubject =
        selectedSubject === "all" || r.teachingAssignment?.subject?.id === selectedSubject

      let matchesDate = true
      if (dateFilter === "today") {
        const todayStr = new Date().toISOString().slice(0, 10)
        const recordDateStr = new Date(r.date).toISOString().slice(0, 10)
        matchesDate = recordDateStr === todayStr
      }

      return matchesClass && matchesSubject && matchesDate
    })
  }, [records, selectedClass, selectedSubject, dateFilter])

  return (
    <div className="space-y-6">
      {/* Page Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor school-wide attendance rates, class metrics, and student logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Filter */}
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[130px] bg-background">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>

          {/* Class Filter */}
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classOptions.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Subject Filter */}
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjectOptions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <AttendanceStats records={filteredRecords} />

      {/* Class Metric Progress Cards */}
      <AttendanceByClass records={filteredRecords} />

      {/* Student Record Table */}
      <StudentSummaryTable records={filteredRecords} />
    </div>
  )
}