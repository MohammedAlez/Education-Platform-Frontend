import { getCurrentUser } from "@/lib/user"
import { AdminOverviewPage } from "./admin-components/main-admin-overview-page"
import { TeacherDashboardPage } from "./teacher-components/main-page"
import { StudentDashboardPage } from "./student-components/main-page"

export default async function Overview() {
  const currentUser = await getCurrentUser()
  const userRole = currentUser?.role 
  // const userRole:Role = "STUDENT"

  if (userRole === "ADMIN") {
    return <AdminOverviewPage />
  }else if (userRole === "TEACHER") {
    return <TeacherDashboardPage />
  }
  return <StudentDashboardPage />
}

