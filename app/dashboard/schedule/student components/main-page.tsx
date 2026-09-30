"use client"

import { useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { Calendar, Loader2 } from "lucide-react"
import { StudentScheduleApiResponse, DayOfWeek } from "@/types/student-schedule"
import { StudentSlotCard } from "./student-slot-card"

export function StudentSchedulePage() {
  const { data: response, isLoading } = useApiQuery<StudentScheduleApiResponse>(
    ["student-schedule"],
    "/schedules/student/me"
  )

  const scheduleDays = response?.data || []

  // Get current day string to visually highlight today's column
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

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          Class Timetable
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Your complete weekly class schedule and classroom locations.
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {scheduleDays.map((dayGroup) => {
            const isToday = dayGroup.day === todayEnum

            return (
              <div key={dayGroup.day} className="space-y-3">
                <div
                  className={`p-2.5 text-center rounded-lg font-semibold text-xs tracking-wide border capitalize ${
                    isToday
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "bg-muted/50 text-foreground"
                  }`}
                >
                  {dayGroup.day.toLowerCase()} {isToday && "(Today)"}
                </div>

                <div className="space-y-2.5">
                  {dayGroup.slots.length === 0 ? (
                    <div className="p-4 border border-dashed rounded-lg text-center text-xs text-muted-foreground">
                      No classes
                    </div>
                  ) : (
                    dayGroup.slots.map((slot) => (
                      <StudentSlotCard key={slot.id} slot={slot} />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}