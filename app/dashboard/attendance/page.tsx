import { getCurrentUser } from "@/lib/user"
import { AttendanceFilters } from "./admin-components/attendance-filters"
import { AttendanceStats } from "./admin-components/attendance-stats"
import { ClassBreakdownCard } from "./admin-components/class-breakdown-card"
import { StudentAttendanceTable } from "./admin-components/student-attendance-table"
import { Role } from "@/lib/rbac"
import { AttendanceSheet } from "./teacher-components/attendance-sheet"
import StudentAttendancePage from "./student-components/main-page"

export default async function AttendancePage() {
  const currentUser = await getCurrentUser()
      const userRole = currentUser?.role 
      // const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminAttendancePage />
      }else if (userRole === "TEACHER") {
        return <TeacherClassesPage />
      }
      return <StudentAttendancePage />
}


function AdminAttendancePage() {
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

function TeacherClassesPage() {
  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
        <p className="text-sm text-muted-foreground">
          Record and manage daily student session attendance.
        </p>
      </div>

      <AttendanceSheet />
    </div>
  )
}