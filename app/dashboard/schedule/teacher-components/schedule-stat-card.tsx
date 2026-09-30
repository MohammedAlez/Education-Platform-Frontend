"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, BookOpen, Clock } from "lucide-react"

interface ScheduleStatCardProps {
  totalClasses: number
  totalStudents: number
  totalWeeklySessions: number
}

export function ScheduleStatCard({
  totalClasses,
  totalStudents,
  totalWeeklySessions,
}: ScheduleStatCardProps) {
  return (
    <Card className="border bg-gradient-to-r from-primary/10 via-background to-background overflow-hidden">
      <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Calendar className="h-3.5 w-3.5" />
            Academic Timetable
          </div>
          <h2 className="text-xl font-bold tracking-tight">Teaching Overview</h2>
          <p className="text-xs text-muted-foreground">
            Manage your assigned classes, weekly schedule, and room allocations.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 shrink-0">
          <div className="p-3 bg-card rounded-xl border shadow-2xs text-center min-w-[90px]">
            <div className="flex justify-center text-primary mb-1">
              <Clock className="h-4 w-4" />
            </div>
            <span className="block text-lg font-extrabold text-foreground">{totalWeeklySessions}</span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Sessions/wk</span>
          </div>

          <div className="p-3 bg-card rounded-xl border shadow-2xs text-center min-w-[90px]">
            <div className="flex justify-center text-primary mb-1">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="block text-lg font-extrabold text-foreground">{totalClasses}</span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Classes</span>
          </div>

          <div className="p-3 bg-card rounded-xl border shadow-2xs text-center min-w-[90px]">
            <div className="flex justify-center text-primary mb-1">
              <Users className="h-4 w-4" />
            </div>
            <span className="block text-lg font-extrabold text-foreground">{totalStudents}</span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Students</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}