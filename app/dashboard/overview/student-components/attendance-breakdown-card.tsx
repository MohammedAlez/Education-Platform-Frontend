"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, Clock } from "lucide-react"

export function AttendanceBreakdownCard() {
  const attendanceStats = [
    {
      label: "Present",
      count: 92,
      icon: CheckCircle2,
      textColor: "text-emerald-700 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60",
    },
    {
      label: "Absent",
      count: 5,
      icon: XCircle,
      textColor: "text-rose-700 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/40 border-rose-200/60",
    },
    {
      label: "Late",
      count: 3,
      icon: Clock,
      textColor: "text-amber-700 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200/60",
    },
  ]

  return (
    <Card className="border shadow-xs h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold">Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-3 gap-3">
          {attendanceStats.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-center ${item.bgColor}`}
              >
                <Icon className={`h-5 w-5 mb-1 ${item.textColor}`} />
                <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                <span className={`text-xl font-bold mt-0.5 ${item.textColor}`}>
                  {item.count}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}