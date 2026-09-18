import { getCurrentUser, requireRole } from "@/lib/user"
import { AttendanceSheet } from "./teacher-components/attendance-sheet"
import StudentAttendancePage from "./student-components/main-page"
import { fetchWithAuth } from "@/lib/api"
import { AttendanceOverviewGrid } from "./admin-components/attendance-overview-grid"
import { AttendanceRecord } from "@/types/attendance"

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


async function AdminAttendancePage() {
  await requireRole("ADMIN")

  let initialRecords: AttendanceRecord[] = [] 

  try {
    const res = await fetchWithAuth("/attendance")
    if (res.ok) {
      const json = await res.json()
      initialRecords = Array.isArray(json) ? json : json.data || []
    }
  } catch (error) {
    console.error("Failed to fetch attendance records:", error)
  }

  return (
    <div className="p-2">
      <AttendanceOverviewGrid initialRecords={initialRecords} />
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