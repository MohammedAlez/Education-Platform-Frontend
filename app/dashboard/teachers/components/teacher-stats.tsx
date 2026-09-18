import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, UserX } from "lucide-react"
import { Teacher } from "@/types/teacher"

interface TeacherStatsProps {
  teachers: Teacher[]
}

export function TeacherStats({ teachers }: TeacherStatsProps) {
  const total = teachers.length
  const active = teachers.filter((t) => t.status === "ACTIVE").length
  const inactive = teachers.filter((t) => t.status === "INACTIVE").length

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Teachers</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{total}</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-xs bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active Teachers</p>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">{active}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <UserCheck className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-xs bg-rose-50/40 dark:bg-rose-950/10 border-rose-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Inactive Teachers</p>
            <p className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 mt-1">{inactive}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">
            <UserX className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}