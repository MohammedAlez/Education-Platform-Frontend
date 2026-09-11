"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { day: "Mon", rate: 85 },
  { day: "Tue", rate: 92 },
  { day: "Wed", rate: 88 },
  { day: "Thu", rate: 95 },
  { day: "Fri", rate: 90 },
]

export function AttendanceChart() {
  return (
    <Card className="h-full shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Weekly Attendance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-[180px] items-end justify-between gap-2 pt-6">
          {chartData.map((data) => (
            <div key={data.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="relative flex h-full w-full items-end justify-center rounded-md bg-accent/40 px-2">
                <div
                  className="w-full max-w-[32px] rounded-t-md bg-primary transition-all duration-500 hover:opacity-85"
                  style={{ height: `${data.rate}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {data.day}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}