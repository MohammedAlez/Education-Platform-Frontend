import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Building2, GraduationCap } from "lucide-react"
import { SubjectItem } from "@/types/subject"

interface SubjectStatsProps {
  subjects: SubjectItem[]
}

export function SubjectStats({ subjects }: SubjectStatsProps) {
  const totalSubjects = subjects.length

  // Total unique classes across all teaching assignments
  const assignedClassesSet = new Set<string>()
  // Total unique teachers across all teaching assignments
  const teachingStaffSet = new Set<string>()

  subjects.forEach((subject) => {
    subject.teachingAssignments?.forEach((assignment) => {
      if (assignment.class?.id) {
        assignedClassesSet.add(assignment.class.id)
      }
      if (assignment.teacher?.id) {
        teachingStaffSet.add(assignment.teacher.id)
      }
    })
  })

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total Subjects */}
      <Card className="border shadow-xs bg-amber-50/40 dark:bg-amber-950/10 border-amber-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Subjects</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{totalSubjects}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
            <BookOpen className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Assigned Classes */}
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Assigned Classes</p>
            <p className="text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400 mt-1">
              {assignedClassesSet.size}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <Building2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Teaching Staff */}
      <Card className="border shadow-xs bg-sky-50/40 dark:bg-sky-950/10 border-sky-100">
        <CardContent className="p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Teaching Staff</p>
            <p className="text-2xl font-bold tracking-tight text-sky-600 dark:text-sky-400 mt-1">
              {teachingStaffSet.size}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
            <GraduationCap className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}