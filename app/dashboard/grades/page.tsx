import { getCurrentUser } from "@/lib/user"
import { GradeFilters } from "./admin-components/grade-filters"
import { GradeStats } from "./admin-components/grade-stats"
import { GradeTable } from "./admin-components/grade-table"
import { Role } from "@/lib/rbac"
import { GradeEntrySheet } from "./teacher-components/grade-entry-sheet"
import StudentGradesPage from "./student-components/main-page"

export default async function GradesPage() {
  const currentUser = await getCurrentUser()
      // const userRole = currentUser?.role 
      const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminGradesPage />
      }else if (userRole === "TEACHER") {
        return <TeacherClassesPage />
      }
      return <StudentGradesPage />
}
function AdminGradesPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grades Monitoring</h1>
          <p className="text-sm text-muted-foreground">
            Track student academic performance and evaluation distributions.
          </p>
        </div>
        <GradeFilters />
      </div>

      <GradeStats />

      <GradeTable />
    </div>
  )
}

function TeacherClassesPage() {

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Grades</h1>
        <p className="text-sm text-muted-foreground">
          Batch enter test, exam, and homework marks for entire classes.
        </p>
      </div>

      <GradeEntrySheet />
    </div>
  )

}