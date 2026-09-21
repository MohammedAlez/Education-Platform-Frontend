import { getCurrentUser } from "@/lib/user"
import { GradeEntrySheet } from "./teacher-components/grade-entry-sheet"
import StudentGradesPage from "./student-components/main-page"
import { AdminGradesMonitoringPage } from "./admin-components/main-admin-page"
import { TeacherGradesPage } from "./teacher-components/main-page"

export default async function GradesPage() {
  const currentUser = await getCurrentUser()
      const userRole = currentUser?.role 
      // const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminGradesMonitoringPage />
      }else if (userRole === "TEACHER") {
        return <TeacherGradesPage />
      }
      return <StudentGradesPage />
}
// function AdminGradesPage() {
//   return (
//     <div className="space-y-6 p-2">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Grades Monitoring</h1>
//           <p className="text-sm text-muted-foreground">
//             Track student academic performance and evaluation distributions.
//           </p>
//         </div>
//         <GradeFilters />
//       </div>

//       <GradeStats />

//       <GradeTable />
//     </div>
//   )
// }

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