import { AssignmentStats } from "./components/assignment-stats"
import { AssignmentFilters } from "./components/assignment-filters"
import { AssignmentTable } from "./components/assignment-table"
import { CreateAssignmentSheet } from "./components/create-assignment-sheet"

export default function TeachingAssignmentsPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teaching Assignments</h1>
          <p className="text-sm text-muted-foreground">
            Manage allocations linking teachers to subjects and target classes.
          </p>
        </div>
        <CreateAssignmentSheet />
      </div>

      <AssignmentStats />

      <div className="space-y-4">
        <AssignmentFilters />
        <AssignmentTable />
      </div>
    </div>
  )
}