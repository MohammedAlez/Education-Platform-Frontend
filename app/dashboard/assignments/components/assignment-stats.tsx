import { Card, CardContent } from "@/components/ui/card"
import { Link2, Users, BookOpen, Building2 } from "lucide-react"
import { TeachingAssignment } from "@/types/class"

interface AssignmentStatsProps {
  assignments: TeachingAssignment[]
}

export function AssignmentStats({ assignments }: AssignmentStatsProps) {
  const totalAssignments = assignments.length

  // Unique teachers count
  const activeTeachers = new Set(
    assignments.map((a) => a.teacherId || a.teacher?.id).filter(Boolean)
  ).size

  // Unique subjects count
  const subjectsTaught = new Set(
    assignments.map((a) => a.subjectId || a.subject?.id).filter(Boolean)
  ).size

  // Unique covered classes count
  const coveredClasses = new Set(
    assignments.map((a) => a.classId || a.class?.id).filter(Boolean)
  ).size

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Assignments */}
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Assignments</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{totalAssignments}</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <Link2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Active Teachers */}
      <Card className="border shadow-xs bg-sky-50/40 dark:bg-sky-950/10 border-sky-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Teachers</p>
            <p className="text-2xl font-bold tracking-tight text-sky-600 dark:text-sky-400 mt-1">{activeTeachers}</p>
          </div>
          <div className="p-3 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Subjects Taught */}
      <Card className="border shadow-xs bg-amber-50/40 dark:bg-amber-950/10 border-amber-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Subjects Taught</p>
            <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 mt-1">{subjectsTaught}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            <BookOpen className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Covered Classes */}
      <Card className="border shadow-xs bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Covered Classes</p>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">{coveredClasses}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <Building2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}