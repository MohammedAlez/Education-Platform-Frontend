import { Button } from "@/components/ui/button"
import { StudentStats } from "./components/student-stats"
import { StudentFilters } from "./components/student-filters"
import { StudentTable } from "./components/student-table"
import { Download, UserPlus } from "lucide-react"

export default function StudentsPage() {
  return (
    <div className="space-y-6 p-2 py-1">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage all students enrolled in your school.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <StudentStats />

      {/* Filter and Table Section */}
      <div className="space-y-4">
        <StudentFilters />
        <StudentTable />
      </div>
    </div>
  )
}