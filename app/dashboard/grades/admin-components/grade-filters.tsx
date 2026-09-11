"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function GradeFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Class Filter */}
      <Select defaultValue="all-classes">
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-classes">All Classes</SelectItem>
          <SelectItem value="class-a">Class A</SelectItem>
          <SelectItem value="class-b">Class B</SelectItem>
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

      {/* Teacher Filter */}
      <Select defaultValue="all-teachers">
        <SelectTrigger className="w-[150px] bg-card">
          <SelectValue placeholder="Teacher" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-teachers">All Teachers</SelectItem>
          <SelectItem value="ahmed">Ahmed Benali</SelectItem>
          <SelectItem value="sara">Sara Ali</SelectItem>
        </SelectContent>
      </Select>

      {/* Period Filter */}
      <Select defaultValue="trimester-1">
        <SelectTrigger className="w-[140px] bg-card">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="trimester-1">Trimester 1</SelectItem>
          <SelectItem value="trimester-2">Trimester 2</SelectItem>
          <SelectItem value="trimester-3">Trimester 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}