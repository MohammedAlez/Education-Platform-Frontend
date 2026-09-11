"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

export function AssignmentFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by teacher, subject, or class..."
          className="pl-9 bg-card"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="all-teachers">
          <SelectTrigger className="w-[140px] bg-card">
            <SelectValue placeholder="Teacher" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-teachers">All Teachers</SelectItem>
            <SelectItem value="ahmed">Ahmed Benali</SelectItem>
            <SelectItem value="sara">Sara Ali</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-subjects">
          <SelectTrigger className="w-[140px] bg-card">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-subjects">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-classes">
          <SelectTrigger className="w-[130px] bg-card">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-classes">All Classes</SelectItem>
            <SelectItem value="class-a">Class A</SelectItem>
            <SelectItem value="class-b">Class B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}