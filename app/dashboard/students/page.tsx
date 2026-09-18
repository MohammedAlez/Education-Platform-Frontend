import { Button } from "@/components/ui/button"
import { StudentStats } from "./admin-components/student-stats"
import { StudentFilters } from "./admin-components/student-filters"
import { StudentsTable } from "./admin-components/student-table"
import { Download, UserPlus } from "lucide-react"
import { getCurrentUser, requireRole } from "@/lib/user"
import { Role } from "@/lib/rbac"
import { TeacherStudentsTable } from "./teacher-components/teacher-students-table"
import { Student } from "@/types/student"
import { fetchWithAuth } from "@/lib/api"

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
// function AdminStudentsPage() {
//   return (
//     <div className="space-y-6 p-2 py-1">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Students</h1>
//           <p className="text-sm text-muted-foreground">
//             Manage all students enrolled in your school.
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button variant="outline" className="gap-2">
//             <Download className="h-4 w-4" />
//             Export
//           </Button>
//           <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
//             <UserPlus className="h-4 w-4" />
//             Add Student
//           </Button>
//         </div>
//       </div>

//       {/* KPI Stats */}
//       <StudentStats />

//       {/* Filter and Table Section */}
//       <div className="space-y-4">
//         <StudentFilters />
//         <StudentTable />
//       </div>
//     </div>
//   )
// }

async function AdminStudentsPage() {
  await requireRole("ADMIN")

  let initialStudents: Student[] = []
  try {
    const res = await fetchWithAuth("/students")
    if (res.ok) {
      const json = await res.json()
      initialStudents = Array.isArray(json) ? json : json.data || []
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

function TeacherStudentsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Students</h1>
        <p className="text-sm text-muted-foreground">
          View roster performance, attendance rates, and grade histories for students in your classes.
        </p>
      </div>

      <TeacherStudentsTable />
    </div>
  )
}