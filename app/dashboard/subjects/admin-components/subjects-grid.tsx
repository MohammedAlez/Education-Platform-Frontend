"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { SUBJECTS_QUERY_KEY, SUBJECTS_PATH } from "@/lib/queries/subjects"
import { SubjectItem } from "@/types/subject"
import { SubjectStats } from "./subject-stats"
import { SubjectCard } from "./subject-card"
import { CreateSubjectDialog } from "./create-subject-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

interface SubjectsGridProps {
  initialSubjects: SubjectItem[]
}

export function SubjectsGrid({ initialSubjects }: SubjectsGridProps) {
  const [search, setSearch] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { data: responseData } = useApiQuery<{ data: SubjectItem[] } | SubjectItem[]>(
    SUBJECTS_QUERY_KEY,
    SUBJECTS_PATH
  )

  const subjects: SubjectItem[] = Array.isArray(responseData)
    ? responseData
    : (responseData as any)?.data || initialSubjects

  // Client side filtering by search query
  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.description || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage academic subjects and curriculum allocations.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Subject
        </Button>
      </div>

      {/* Stats Cards */}
      <SubjectStats subjects={subjects} />

      {/* Search Input */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Cards Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border rounded-xl bg-card text-muted-foreground">
          No subjects found.
        </div>
      )}

      {/* Create Modal */}
      <CreateSubjectDialog
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}