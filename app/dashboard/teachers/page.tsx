import { Button } from "@/components/ui/button"
import { TeacherStats } from "./components/teacher-stats"
import { TeacherFilters } from "./components/teacher-filters"
import { TeacherTable } from "./components/teacher-table"
import { UserPlus, Download } from "lucide-react"

export default function TeachersPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
          <p className="text-sm text-muted-foreground">
            Manage teaching staff and their subject assignments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <UserPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <TeacherStats />

      <div className="space-y-4">
        <TeacherFilters />
        <TeacherTable />
      </div>
    </div>
  )
}