import { Button } from "@/components/ui/button"
import { SubjectStats } from "./components/subject-stats"
import { SubjectFilters } from "./components/subject-filters"
import { SubjectGrid } from "./components/subject-card"
import { PlusCircle } from "lucide-react"

export default function SubjectsPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
          <p className="text-sm text-muted-foreground">
            Manage academic subjects and curriculum allocations.
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-4 w-4" />
          Add Subject
        </Button>
      </div>

      <SubjectStats />

      <div className="space-y-4">
        <SubjectFilters />
        <SubjectGrid />
      </div>
    </div>
  )
}