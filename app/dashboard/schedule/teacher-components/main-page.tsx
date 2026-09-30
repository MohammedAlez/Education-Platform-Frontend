"use client"

import { useState, useMemo } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  CalendarDays,
  List,
  Filter,
  Loader2,
  Clock,
  MapPin,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import {
  TeacherScheduleSlot,
  TeacherAssignedClass,
  DayOfWeek,
} from "@/types/teacher-schedule"
import { ScheduleStatCard } from "./schedule-stat-card"
import { ScheduleSlotItem } from "./schedule-slot-item"

const DAYS: { key: DayOfWeek; label: string }[] = [
  { key: "SUNDAY", label: "Sunday" },
  { key: "MONDAY", label: "Monday" },
  { key: "TUESDAY", label: "Tuesday" },
  { key: "WEDNESDAY", label: "Wednesday" },
  { key: "THURSDAY", label: "Thursday" },
]

export function TeacherSchedulePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedClassId, setSelectedClassId] = useState<string | null>("ALL")
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>("SUNDAY")

  // 1. GET /api/teachers/classes
  const { data: classesResponse, isLoading: isLoadingClasses } = useApiQuery<
    { data: TeacherAssignedClass[] } | TeacherAssignedClass[]
  >(["teacher-classes"], "/teachers/classes")

  const classesList: TeacherAssignedClass[] = Array.isArray(classesResponse)
    ? classesResponse
    : (classesResponse as any)?.data || []

  // 2. GET /api/shedules/teacher/me
  const { data: schedulesResponse, isLoading: isLoadingSchedules } = useApiQuery<
    { data: TeacherScheduleSlot[] } | TeacherScheduleSlot[]
  >(["teacher-schedules"], "/schedules/teacher/me")

  const scheduleList: TeacherScheduleSlot[] = Array.isArray(schedulesResponse)
    ? schedulesResponse
    : (schedulesResponse as any)?.data || []

  // Aggregate student total counts across assigned classes
  const totalStudents = useMemo(() => {
    return classesList.reduce((acc, curr) => acc + (curr.studentsCount || 0), 0)
  }, [classesList])

  // Filter slots based on selected class
  const filteredSlots = useMemo(() => {
    if (selectedClassId === "ALL") return scheduleList
    return scheduleList.filter((s) => s.class?.id === selectedClassId)
  }, [scheduleList, selectedClassId])

  const isLoading = isLoadingClasses || isLoadingSchedules

  return (
    <div className="space-y-6 p-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            My Weekly Schedule
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your personal timetable, classroom designations, and session hours.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Class Filter Dropdown */}
          <div className="w-44">
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="h-9 text-xs">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Classes</SelectItem>
                {classesList.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name} ({cls.studentsCount} students)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View Switcher */}
          <div className="flex items-center bg-muted/60 p-1 rounded-lg border">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-7 text-xs gap-1.5"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-7 text-xs gap-1.5"
            >
              <List className="h-3.5 w-3.5" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Stat Card Component */}
      <ScheduleStatCard
        totalClasses={classesList.length}
        totalStudents={totalStudents}
        totalWeeklySessions={scheduleList.length}
      />

      {/* Main Timetable Interface */}
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : viewMode === "grid" ? (
        /* WEEKLY GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {DAYS.map((day) => {
            const daySlots = filteredSlots
              .filter((s) => s.dayOfWeek === day.key)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))

            return (
              <div key={day.key} className="space-y-3">
                <div className="p-2.5 text-center bg-muted/50 rounded-lg font-semibold text-xs tracking-wide border">
                  {day.label}
                </div>

                <div className="space-y-2.5">
                  {daySlots.length === 0 ? (
                    <div className="p-4 border border-dashed rounded-lg text-center text-xs text-muted-foreground">
                      No lectures
                    </div>
                  ) : (
                    daySlots.map((slot) => (
                      <ScheduleSlotItem key={slot.id} slot={slot} />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* DAY VIEW (LIST FORMAT) */
        <div className="space-y-4">
          {/* Day Selection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {DAYS.map((day) => (
              <Button
                key={day.key}
                variant={selectedDay === day.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(day.key)}
                className="text-xs shrink-0"
              >
                {day.label}
              </Button>
            ))}
          </div>

          <Card className="border shadow-2xs">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>
                  Sessions for {DAYS.find((d) => d.key === selectedDay)?.label}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              {filteredSlots.filter((s) => s.dayOfWeek === selectedDay).length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-xs">
                  No sessions scheduled for this day.
                </div>
              ) : (
                filteredSlots
                  .filter((s) => s.dayOfWeek === selectedDay)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3.5 border rounded-xl flex items-center justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-sm capitalize">{slot.subject?.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                            Class {slot.class?.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {slot.room}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                          <Clock className="h-3.5 w-3.5" />
                          {slot.startTime} - {slot.endTime}
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}