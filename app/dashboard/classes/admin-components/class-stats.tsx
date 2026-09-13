import { Card, CardContent } from "@/components/ui/card"
import { Building2, GraduationCap, BookOpen, Users } from "lucide-react"
import { ClassItem, TeachingAssignment } from "@/types/class"

interface ClassStatsProps {
  classes: ClassItem[]
  assignments: TeachingAssignment[]
}

export function ClassStats({ classes, assignments }: ClassStatsProps) {
  const totalClasses = classes.length
  
  // Sum of studentCount across all classes
  const totalEnrolled = classes.reduce((acc, curr) => acc + (curr.studentCount || 0), 0)
  
  // Total unique subjects assigned
  const uniqueSubjects = new Set(assignments.map((a) => a.subjectId || a.subject?.id)).size
  
  // Total unique teachers assigned across all classes
  const assignedTeachers = new Set(assignments.map((a) => a.teacherId || a.teacher?.id)).size

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Classes */}
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Classes</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{totalClasses}</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <Building2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Total Enrolled */}
      <Card className="border shadow-xs bg-sky-50/40 dark:bg-sky-950/10 border-sky-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Enrolled</p>
            <p className="text-2xl font-bold tracking-tight text-sky-600 dark:text-sky-400 mt-1">{totalEnrolled}</p>
          </div>
          <div className="p-3 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
            <GraduationCap className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Active Subjects */}
      <Card className="border shadow-xs bg-amber-50/40 dark:bg-amber-950/10 border-amber-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Subjects</p>
            <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 mt-1">{uniqueSubjects}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            <BookOpen className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Assigned Teachers */}
      <Card className="border shadow-xs bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Assigned Teachers</p>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">{assignedTeachers}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}