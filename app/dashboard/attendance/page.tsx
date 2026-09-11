import { AttendanceFilters } from "./components/attendance-filters"
import { AttendanceStats } from "./components/attendance-stats"
import { ClassBreakdownCard } from "./components/class-breakdown-card"
import { StudentAttendanceTable } from "./components/student-attendance-table"

export default function AttendancePage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Overview</h1>
          <p className="text-sm text-muted-foreground">
            Monitor school-wide attendance rates, class metrics, and student logs.
          </p>
        </div>
        <AttendanceFilters />
      </div>

      <AttendanceStats />

      <ClassBreakdownCard />

      <StudentAttendanceTable />
    </div>
  )
}