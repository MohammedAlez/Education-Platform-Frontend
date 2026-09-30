import { getCurrentUser } from "@/lib/user"
import { AdminSchedulesPage } from "./admin-components/main-page"


export default async function AttendancePage() {
  const currentUser = await getCurrentUser()
      const userRole = currentUser?.role 
      // const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminSchedulesPage />
      }else if (userRole === "TEACHER") {
        return <div>teacher</div>
      }
      return <div>student</div>
}
