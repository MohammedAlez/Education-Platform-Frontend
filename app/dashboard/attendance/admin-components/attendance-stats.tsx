import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, Percent } from "lucide-react"
import { AttendanceRecord } from "@/types/attendance"

interface AttendanceStatsProps {
  records: AttendanceRecord[]
}

export function AttendanceStats({ records }: AttendanceStatsProps) {
  const presentCount = records.filter((r) => r.status === "PRESENT").length
  const absentCount = records.filter((r) => r.status === "ABSENT").length
  const lateCount = records.filter((r) => r.status === "LATE").length

  const totalEvaluated = presentCount + absentCount + lateCount
  const attendanceRate = totalEvaluated > 0
    ? Math.round(((presentCount + lateCount) / totalEvaluated) * 100)
    : 0

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Present Card */}
      <Card className="border shadow-xs bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-100/80">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Present</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{presentCount}</p>
          </div>
          <div className="p-3 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Absent Card */}
      <Card className="border shadow-xs bg-rose-50/40 dark:bg-rose-950/10 border-rose-100/80">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Absent</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{absentCount}</p>
          </div>
          <div className="p-3 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
            <XCircle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Late Card */}
      <Card className="border shadow-xs bg-amber-50/40 dark:bg-amber-950/10 border-amber-100/80">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Late</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{lateCount}</p>
          </div>
          <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Attendance Rate Card */}
      <Card className="border shadow-xs bg-purple-50/40 dark:bg-purple-950/10 border-purple-100/80">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Attendance Rate</p>
            <p className="text-2xl font-bold tracking-tight text-foreground mt-1">{attendanceRate}%</p>
          </div>
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
            <Percent className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}