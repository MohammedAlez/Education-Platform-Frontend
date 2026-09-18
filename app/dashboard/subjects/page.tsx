import { getCurrentUser, requireRole } from "@/lib/user"
import { Role } from "@/lib/rbac"
import StudentSubjectsPage from "./student-components/main-page"
import { SubjectItem } from "@/types/subject"
import { fetchWithAuth } from "@/lib/api"
import { SubjectsGrid } from "./admin-components/subjects-grid"

export default async function SubjectsPage() {
  const currentUser = await getCurrentUser()
      const userRole = currentUser?.role 
      // const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminSubjectsPage />
      }
      return <StudentSubjectsPage />
}

async function AdminSubjectsPage() {
  await requireRole("ADMIN")

  let initialSubjects: SubjectItem[] = []

  try {
    const res = await fetchWithAuth("/subjects")
    if (res.ok) {
      const json = await res.json()
      initialSubjects = Array.isArray(json) ? json : json.data || []
    }
  } catch (error) {
    console.error("Failed to fetch subjects:", error)
  }

  return (
    <div className="p-2">
      <SubjectsGrid initialSubjects={initialSubjects} />
    </div>
  )
}

