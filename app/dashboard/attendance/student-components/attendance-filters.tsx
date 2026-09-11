"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AttendanceFiltersProps {
  month: string
  setMonth: (value: string) => void
  subject: string
  setSubject: (value: string) => void
  status: string
  setStatus: (value: string) => void
}

export function AttendanceFilters({
  month,
  setMonth,
  subject,
  setSubject,
  status,
  setStatus,
}: AttendanceFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Month Filter */}
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className="w-[140px] bg-background">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Months</SelectItem>
          <SelectItem value="sep">September</SelectItem>
          <SelectItem value="aug">August</SelectItem>
          <SelectItem value="jul">July</SelectItem>
        </SelectContent>
      </Select>

      {/* Subject Filter */}
      <Select value={subject} onValueChange={setSubject}>
        <SelectTrigger className="w-[160px] bg-background">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          <SelectItem value="math">Mathematics</SelectItem>
          <SelectItem value="physics">Physics</SelectItem>
          <SelectItem value="cs">Computer Science</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[140px] bg-background">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="present">Present</SelectItem>
          <SelectItem value="absent">Absent</SelectItem>
          <SelectItem value="late">Late</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}