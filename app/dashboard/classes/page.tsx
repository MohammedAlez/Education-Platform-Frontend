import { Button } from "@/components/ui/button"
import { ClassStats } from "./admin-components/class-stats"
import { ClassFilters } from "./admin-components/class-filters"
// import { ClassGrid } from "./admin-components/class-card"
import { PlusCircle } from "lucide-react"
import { getCurrentUser } from "@/lib/user"
import { Role } from "@/lib/rbac"
import { ClassHeader } from "./student-components/class-header"
import { ClassSubjects } from "./student-components/class-subjects"
import { ClassTeachers } from "./student-components/class-teachers"
import { fetchWithAuth } from "@/lib/api"
import { requireRole } from "@/lib/user"
import { ClassesGrid } from "./admin-components//classes-grid"
import { ClassItem, TeachingAssignment } from "@/types/class"
import { ClassGrid } from "./teacher-components/class-card"


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
    <div className="p-6">
      <ClassesGrid
        initialClasses={initialClasses}
        initialAssignments={initialAssignments}
      />
    </div>
  )
}

function TeacherClassesPage() {

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Classes</h1>
        <p className="text-sm text-muted-foreground">
          View assigned class sections and access student rosters or gradebooks.
        </p>
      </div>

      <ClassGrid />
    </div>
  )

}

function StudentMyClassPage() {
  return (
    <div className="space-y-6 p-2">
      <ClassHeader className="Class A" studentCount={28} />
      <ClassSubjects />
      <ClassTeachers />
    </div>
  )
}