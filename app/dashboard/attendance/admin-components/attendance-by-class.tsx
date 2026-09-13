import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AttendanceRecord } from "@/types/attendance"

interface AttendanceByClassProps {
  records: AttendanceRecord[]
}

export function AttendanceByClass({ records }: AttendanceByClassProps) {
  // Aggregate attendance metrics grouped by class name
  const classStatsMap = new Map<string, { total: number; present: number }>()

  records.forEach((record) => {
    const className = record.teachingAssignment?.class?.name || "Unassigned"
    const current = classStatsMap.get(className) || { total: 0, present: 0 }

    if (record.status === "PRESENT" || record.status === "LATE") {
      current.present += 1
    }
    if (record.status !== "EXCUSED") {
      current.total += 1
    }

    classStatsMap.set(className, current)
  })

  const classRates = Array.from(classStatsMap.entries()).map(([className, stats]) => {
    const rate = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0
    return { className, rate }
  })

  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold">Attendance by Class</CardTitle>
      </CardHeader>
      <CardContent>
        {classRates.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classRates.map(({ className, rate }) => (
              <div key={className} className="p-4 border rounded-xl bg-card space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">{className}</span>
                  <span className="font-bold text-sm text-purple-600 dark:text-purple-400">{rate}%</span>
                </div>
                <Progress value={rate} className="h-2 bg-muted [&>div]:bg-purple-600" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-4">
            No class attendance metrics available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}