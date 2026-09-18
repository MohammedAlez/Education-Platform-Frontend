import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, UserX, UserPlus } from "lucide-react"
import { Student } from "@/types/student"

interface StudentStatsProps {
  students: Student[]
}

export function StudentStats({ students }: StudentStatsProps) {
  const total = students.length
  const active = students.filter((s) => (s.status || s.user?.status) === "ACTIVE").length
  const inactive = students.filter((s) => (s.status || s.user?.status) === "INACTIVE").length

  // Calculate new students created in current calendar month
  const now = new Date()
  const newThisMonth = students.filter((s) => {
    if (!s.createdAt) return false
    const created = new Date(s.createdAt)
    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    )
  }).length

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Students */}
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{total}</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
            <Users className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Active */}
      <Card className="border shadow-xs bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Active</p>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">{active}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
            <UserCheck className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Inactive */}
      <Card className="border shadow-xs bg-rose-50/40 dark:bg-rose-950/10 border-rose-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Inactive</p>
            <p className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 mt-1">{inactive}</p>
          </div>
          <div className="p-3 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">
            <UserX className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* New This Month */}
      <Card className="border shadow-xs bg-blue-50/40 dark:bg-blue-950/10 border-blue-100">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">New This Month</p>
            <p className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400 mt-1">{newThisMonth}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
            <UserPlus className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}