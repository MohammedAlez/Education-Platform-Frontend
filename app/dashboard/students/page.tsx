import { StudentsTable } from "./admin-components/student-table"
import { getCurrentUser, requireRole } from "@/lib/user"
import { Role } from "@/lib/rbac"
import { Student } from "@/types/student"
import { fetchWithAuth } from "@/lib/api"
import TeacherStudentsPage from "./teacher-components/main-page"

export default async function StudentsPage() {
  const currentUser = await getCurrentUser()
  const userRole = currentUser?.role 
  // const userRole:Role = "TEACHER"

  if (userRole === "ADMIN") {
    return <AdminStudentsPage />
  }else if (userRole === "TEACHER") {
    return <TeacherStudentsPage />
  }
  return <div>Access Denied</div>
}


async function AdminStudentsPage() {
  await requireRole("ADMIN")

  let initialStudents: Student[] = []
  try {
    const res = await fetchWithAuth("/students")
    if (res.ok) {
      const json = await res.json()
      initialStudents = Array.isArray(json) ? json : json.data || []
      console.log("initial students from admin students page:", initialStudents)
    }
  } catch (error) {
    console.error("Failed fetching initial students:", error)
  }

  return (
    <div className="p-2">
      <StudentsTable initialData={initialStudents} />
    </div>
  )
}
