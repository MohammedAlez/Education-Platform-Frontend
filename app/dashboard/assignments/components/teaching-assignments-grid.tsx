"use client"

import { useState, useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { TEACHING_ASSIGNMENTS_QUERY_KEY, TEACHING_ASSIGNMENTS_PATH } from "@/lib/queries/classes"
import { TeachingAssignment } from "@/types/class"
import { AssignmentStats } from "./assignment-stats"
import { AssignmentsTable } from "./assignments-table"
import { AssignTeacherDialog } from "./assign-teacher-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, UserPlus } from "lucide-react"

interface TeachingAssignmentsGridProps {
  initialAssignments: TeachingAssignment[]
}

export function TeachingAssignmentsGrid({ initialAssignments }: TeachingAssignmentsGridProps) {
  const [search, setSearch] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>("all")
  const [selectedSubject, setSelectedSubject] = useState<string | null>("all")
  const [selectedClass, setSelectedClass] = useState<string | null>("all")
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

  const { data: assignmentsData } = useApiQuery<{ data: TeachingAssignment[] } | TeachingAssignment[]>(
    TEACHING_ASSIGNMENTS_QUERY_KEY,
    TEACHING_ASSIGNMENTS_PATH
  )

  const assignments: TeachingAssignment[] = Array.isArray(assignmentsData)
    ? assignmentsData
    : (assignmentsData as any)?.data || initialAssignments

  // Generate unique dropdown filter options from available assignments
  const teacherOptions = useMemo(() => {
    const map = new Map<string, string>()
    assignments.forEach((a) => {
      if (a.teacher?.id && a.teacher?.firstName) {
        map.set(a.teacher.id, `${a.teacher.firstName} ${a.teacher.lastName}`)
      }
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [assignments])

  const subjectOptions = useMemo(() => {
    const map = new Map<string, string>()
    assignments.forEach((a) => {
      if (a.subject?.id && a.subject?.name) {
        map.set(a.subject.id, a.subject.name)
      }
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [assignments])

  const classOptions = useMemo(() => {
    const map = new Map<string, string>()
    assignments.forEach((a) => {
      if (a.class?.id && a.class?.name) {
        map.set(a.class.id, a.class.name)
      }
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [assignments])

  // Multi-level filtering
  const filteredAssignments = useMemo(() => {
    return assignments.filter((a) => {
      const teacherName = `${a.teacher?.firstName || ""} ${a.teacher?.lastName || ""}`.toLowerCase()
      const subjectName = (a.subject?.name || "").toLowerCase()
      const className = (a.class?.name || "").toLowerCase()
      const query = search.toLowerCase()

      const matchesSearch =
        teacherName.includes(query) ||
        subjectName.includes(query) ||
        className.includes(query)

      const matchesTeacher =
        selectedTeacher === "all" || (a.teacherId || a.teacher?.id) === selectedTeacher

      const matchesSubject =
        selectedSubject === "all" || (a.subjectId || a.subject?.id) === selectedSubject

      const matchesClass =
        selectedClass === "all" || (a.classId || a.class?.id) === selectedClass

      return matchesSearch && matchesTeacher && matchesSubject && matchesClass
    })
  }, [assignments, search, selectedTeacher, selectedSubject, selectedClass])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teaching Assignments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage allocations linking teachers to subjects and target classes.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsAssignModalOpen(true)}>
          <UserPlus className="h-4 w-4" /> Assign Teacher
        </Button>
      </div>

      {/* Stats Section */}
      <AssignmentStats assignments={assignments} />

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by teacher, subject, or class..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Teacher Filter */}
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="All Teachers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {teacherOptions.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
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
        </div>
      </div>

      {/* Assignments Table */}
      <AssignmentsTable assignments={filteredAssignments} />

      {/* Modal */}
      <AssignTeacherDialog
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
      />
    </div>
  )
}