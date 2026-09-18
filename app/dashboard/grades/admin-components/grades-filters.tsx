"use client"

import { useApiQuery } from "@/hooks/use-api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GradesFiltersProps {
  selectedClass: string | null
  setSelectedClass: (val: string | null) => void
  selectedSubject: string | null
  setSelectedSubject: (val: string | null) => void
  selectedTeacher: string | null
  setSelectedTeacher: (val: string | null) => void
}

export function GradesFilters({
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  selectedTeacher,
  setSelectedTeacher,
}: GradesFiltersProps) {
  const { data: classesRes } = useApiQuery<any>(["classes"], "/classes")
  const { data: subjectsRes } = useApiQuery<any>(["subjects"], "/subjects")
  const { data: teachersRes } = useApiQuery<any>(["teachers"], "/teachers")

  const classes = Array.isArray(classesRes) ? classesRes : classesRes?.data || []
  const subjects = Array.isArray(subjectsRes) ? subjectsRes : subjectsRes?.data || []
  const teachers = Array.isArray(teachersRes) ? teachersRes : teachersRes?.data || []

  // Resolve active display names
  const activeClassName =
    selectedClass && selectedClass !== "all"
      ? classes.find((c: any) => c.id === selectedClass)?.name
      : undefined

  const activeSubjectName =
    selectedSubject && selectedSubject !== "all"
      ? subjects.find((s: any) => s.id === selectedSubject)?.name
      : undefined

  const activeTeacherObj =
    selectedTeacher && selectedTeacher !== "all"
      ? teachers.find((t: any) => t.id === selectedTeacher)
      : null
  const activeTeacherName = activeTeacherObj
    ? `${activeTeacherObj.firstName} ${activeTeacherObj.lastName}`
    : undefined

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Class Filter */}
      <Select
        value={selectedClass || "all"}
        onValueChange={(val) => setSelectedClass(val === "all" ? null : val)}
      >
        <SelectTrigger className="w-[160px] bg-background">
          <SelectValue placeholder="All Classes">
            {activeClassName || "All Classes"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Classes</SelectItem>
          {classes.map((c: any) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Subject Filter */}
      <Select
        value={selectedSubject || "all"}
        onValueChange={(val) => setSelectedSubject(val === "all" ? null : val)}
      >
        <SelectTrigger className="w-[160px] bg-background">
          <SelectValue placeholder="All Subjects">
            {activeSubjectName || "All Subjects"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {subjects.map((s: any) => (
            <SelectItem key={s.id} value={s.id}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Teacher Filter */}
      <Select
        value={selectedTeacher || "all"}
        onValueChange={(val) => setSelectedTeacher(val === "all" ? null : val)}
      >
        <SelectTrigger className="w-[160px] bg-background">
          <SelectValue placeholder="All Teachers">
            {activeTeacherName || "All Teachers"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teachers</SelectItem>
          {teachers.map((t: any) => (
            <SelectItem key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}