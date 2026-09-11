"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar as CalendarIcon } from "lucide-react"

export function AttendanceFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Date Filter */}
      <Select defaultValue="today">
        <SelectTrigger className="w-[160px] bg-card">
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="this-week">This Week</SelectItem>
          <SelectItem value="this-month">This Month</SelectItem>
          <SelectItem value="custom">Custom Range...</SelectItem>
        </SelectContent>
      </Select>

      {/* Class Filter */}
      <Select defaultValue="all-classes">
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-classes">All Classes</SelectItem>
          <SelectItem value="class-a">Class A</SelectItem>
          <SelectItem value="class-b">Class B</SelectItem>
          <SelectItem value="class-c">Class C</SelectItem>
        </SelectContent>
      </Select>

      {/* Subject Filter */}
      <Select defaultValue="all-subjects">
        <SelectTrigger className="w-[150px] bg-card">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-subjects">All Subjects</SelectItem>
          <SelectItem value="math">Mathematics</SelectItem>
          <SelectItem value="physics">Physics</SelectItem>
          <SelectItem value="cs">Computer Science</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}