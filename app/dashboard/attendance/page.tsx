import { getCurrentUser, requireRole } from "@/lib/user"
import StudentAttendancePage from "./student-components/main-page"
import { fetchWithAuth } from "@/lib/api"
import { AttendanceOverviewGrid } from "./admin-components/attendance-overview-grid"
import { AttendanceRecord } from "@/types/attendance"
import { TeacherAttendancePage } from "./teacher-components/main-page"

export default async function AttendancePage() {
  const currentUser = await getCurrentUser()
      const userRole = currentUser?.role 
      // const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminAttendancePage />
      }else if (userRole === "TEACHER") {
        return <TeacherAttendancePage />
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
