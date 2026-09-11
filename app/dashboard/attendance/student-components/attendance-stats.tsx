"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock, Percent } from "lucide-react"

interface AttendanceStatsProps {
  rate: string
  presentCount: number
  absentCount: number
  lateCount: number
}

export function AttendanceStats({
  rate = "94%",
  presentCount = 92,
  absentCount = 5,
  lateCount = 3,
}: AttendanceStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Overall Rate Card */}
      <Card className="border shadow-xs bg-gradient-to-br from-primary/5 via-background to-background">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">My Attendance Rate</p>
            <p className="text-2xl font-bold tracking-tight mt-1">{rate}</p>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Percent className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Present Card */}
      <Card className="border shadow-xs">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Present</p>
            <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">
              {presentCount}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Absent Card */}
      <Card className="border shadow-xs">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Absent</p>
            <p className="text-2xl font-bold tracking-tight text-rose-600 dark:text-rose-400 mt-1">
              {absentCount}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
            <XCircle className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>

      {/* Late Card */}
      <Card className="border shadow-xs">
        <CardContent className="p-5 py-0 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Late</p>
            <p className="text-2xl font-bold tracking-tight text-amber-600 dark:text-amber-400 mt-1">
              {lateCount}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}