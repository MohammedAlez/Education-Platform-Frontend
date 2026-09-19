"use client"

import { useApiQuery } from "@/hooks/use-api"
import { TEACHER_CLASSES_PATH, TEACHER_CLASSES_QUERY_KEY } from "@/lib/queries/teachers"
import { TeacherClass } from "@/types/teacher"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StudentsFiltersProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  selectedClassId: string | null
  setSelectedClassId: (val: string | null) => void
}

export function StudentsFilters({
  searchQuery,
  setSearchQuery,
  selectedClassId,
  setSelectedClassId,
}: StudentsFiltersProps) {
  // Fetch assigned classes for dropdown
  const { data: classesRes } = useApiQuery<any>(
    TEACHER_CLASSES_QUERY_KEY,
    TEACHER_CLASSES_PATH
  )
  const classes: TeacherClass[] = Array.isArray(classesRes) ? classesRes : classesRes?.data || []

  // Active class name calculation for display
  const activeClass = classes.find((c) => c.id === selectedClassId)

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search student by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-background"
        />
      </div>

      {/* Class Filter Dropdown */}
      <Select
        value={selectedClassId || "all"}
        onValueChange={(val) => setSelectedClassId(val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full sm:w-[180px] bg-background">
          <SelectValue placeholder="All Classes">
            {activeClass ? activeClass.name : "All Classes"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classes</SelectItem>
          {classes.map((cls) => (
            <SelectItem key={cls.id} value={cls.id}>
              {cls.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}