"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { CLASSES_QUERY_KEY, CLASSES_PATH, TEACHING_ASSIGNMENTS_QUERY_KEY, TEACHING_ASSIGNMENTS_PATH } from "@/lib/queries/classes"
import { ClassItem, TeachingAssignment } from "@/types/class"
import { ClassStats } from "./class-stats"
import { ClassCard } from "./class-card"
import { CreateClassDialog } from "./create-class-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

interface ClassesGridProps {
  initialClasses: ClassItem[]
  initialAssignments: TeachingAssignment[]
}

export function ClassesGrid({ initialClasses, initialAssignments }: ClassesGridProps) {
  const [search, setSearch] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // React Query cached fetching synced with API proxy
  const { data: classesData } = useApiQuery<{ data: ClassItem[] } | ClassItem[]>(
    CLASSES_QUERY_KEY,
    CLASSES_PATH
  )

  const { data: assignmentsData } = useApiQuery<{ data: TeachingAssignment[] } | TeachingAssignment[]>(
    TEACHING_ASSIGNMENTS_QUERY_KEY,
    TEACHING_ASSIGNMENTS_PATH
  )

  const classes: ClassItem[] = Array.isArray(classesData)
    ? classesData
    : (classesData as any)?.data || initialClasses

  const assignments: TeachingAssignment[] = Array.isArray(assignmentsData)
    ? assignmentsData
    : (assignmentsData as any)?.data || initialAssignments

  // Filter Classes
  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || "").toLowerCase().includes(search.toLowerCase())
  )

  // Calculate unique assigned subjects per class
  const getSubjectCountForClass = (classId: string) => {
    const classAssignments = assignments.filter((a) => a.classId === classId || a.class?.id === classId)
    const uniqueSubjects = new Set(classAssignments.map((a) => a.subjectId || a.subject?.id))
    return uniqueSubjects.size
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Classes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Overview and management of all school classes.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4" /> Create Class
        </Button>
      </div>

      {/* Top Stats */}
      <ClassStats classes={classes} assignments={assignments} />

      {/* Search Input */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search class..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cards Grid */}
      {filteredClasses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClasses.map((c) => (
            <ClassCard
              key={c.id}
              classItem={c}
              subjectCount={getSubjectCountForClass(c.id)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border rounded-xl bg-card text-muted-foreground">
          No classes found.
        </div>
      )}

      {/* Create Class Modal */}
      <CreateClassDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}