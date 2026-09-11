import { GradeFilters } from "./components/grade-filters"
import { GradeStats } from "./components/grade-stats"
import { GradeTable } from "./components/grade-table"

export default function GradesPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grades Monitoring</h1>
          <p className="text-sm text-muted-foreground">
            Track student academic performance and evaluation distributions.
          </p>
        </div>
        <GradeFilters />
      </div>

      <GradeStats />

      <GradeTable />
    </div>
  )
}