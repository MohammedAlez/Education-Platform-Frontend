import { Button } from "@/components/ui/button"
import { SubjectStats } from "./admin-components/subject-stats"
import { SubjectFilters } from "./admin-components/subject-filters"
import { SubjectGrid } from "./admin-components/subject-card"
import { PlusCircle } from "lucide-react"
import { getCurrentUser } from "@/lib/user"
import { Role } from "@/lib/rbac"
import StudentSubjectsPage from "./student-components/main-page"

export default async function SubjectsPage() {
  const currentUser = await getCurrentUser()
      const userRole = currentUser?.role 
      // const userRole:Role = "STUDENT"
    
      if (userRole === "ADMIN") {
        return <AdminSubjectsPage />
      }
      return <StudentSubjectsPage />
}

function AdminSubjectsPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subjects</h1>
          <p className="text-sm text-muted-foreground">
            Manage academic subjects and curriculum allocations.
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <PlusCircle className="h-4 w-4" />
          Add Subject
        </Button>
      </div>

      <SubjectStats />

      <div className="space-y-4">
        <SubjectFilters />
        <SubjectGrid />
      </div>
    </div>
  )
}

