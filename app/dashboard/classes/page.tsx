
import { getCurrentUser } from "@/lib/user"
import { fetchWithAuth } from "@/lib/api"
import { requireRole } from "@/lib/user"
import { ClassesGrid } from "./admin-components//classes-grid"
import { ClassItem, TeachingAssignment } from "@/types/class"
import TeacherClassesPage from "./teacher-components/main-page"
import { StudentMyClassPage } from "./student-components/main-page"


export default async function Classes() {
  const currentUser = await getCurrentUser()
    const userRole = currentUser?.role 
    // const userRole:Role = "STUDENT"
  
    if (userRole === "ADMIN") {
      return <AdminClassesPage />
    }else if (userRole === "TEACHER") {
      return <TeacherClassesPage />
    }
    return <StudentMyClassPage />
}


async function AdminClassesPage() {
  await requireRole("ADMIN")

  let initialClasses: ClassItem[] = []
  let initialAssignments: TeachingAssignment[] = []

  try {
    const [classesRes, assignmentsRes] = await Promise.all([
      fetchWithAuth("/classes"),
      fetchWithAuth("/teaching-assignments"),
    ])

    console.log("response: ", classesRes, assignmentsRes)

    if (classesRes.ok) {
      const json = await classesRes.json()
      console.log("calsses json: ", json)
      initialClasses = Array.isArray(json) ? json : json.data || []
    }

    if (assignmentsRes.ok) {
      const json = await assignmentsRes.json()
      console.log("assignments json: ", json)
      initialAssignments = Array.isArray(json) ? json : json.data || []
    }
  } catch (error) {
    console.error("Failed fetching classes or assignments:", error)
  }

  return (
    <div className="p-2">
      <ClassesGrid
        initialClasses={initialClasses}
        initialAssignments={initialAssignments}
      />
    </div>
  )
}
