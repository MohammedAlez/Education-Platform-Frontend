"use client"

import { useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Loader2 } from "lucide-react"
import { TeacherTodaySchedule, DayOfWeek } from "@/types/teacher-overview"

export function TodaysClasses() {
  // Dynamically derive current day string for the API query
  const todayEnum = useMemo<DayOfWeek>(() => {
    const days: DayOfWeek[] = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ]
    return days[new Date().getDay()]
  }, [])

  const { data: scheduleResponse, isLoading } = useApiQuery<
    { data: TeacherTodaySchedule[] } | TeacherTodaySchedule[]
  >(["today-schedule", todayEnum], `/schedules/teacher/me?day=${todayEnum}`)

  const todaysSchedule: TeacherTodaySchedule[] = Array.isArray(scheduleResponse)
    ? scheduleResponse
    : (scheduleResponse as any)?.data || []

  return (
    <Card className="shadow-xs border h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Today's Classes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : todaysSchedule.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">
            No classes scheduled for today.
          </p>
        ) : (
          todaysSchedule.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border bg-muted/20 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground capitalize">
                    {item.subject?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.startTime} - {item.endTime} ({item.room})
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
              >
                {item.class?.name}
              </Badge>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}