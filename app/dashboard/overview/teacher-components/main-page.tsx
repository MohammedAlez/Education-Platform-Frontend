"use client"

import { TeacherStats } from "./teacher-stats"
import { TodaysClasses } from "./todays-classes"
import { PendingAttendanceCard } from "./pending-attendance-card"
import { RecentGradesCard } from "./recent-grades-card"

export function TeacherDashboardPage() {
  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning 👋</h1>
        <p className="text-sm text-muted-foreground">
          Here's your teaching overview.
        </p>
      </div>

      <TeacherStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <TodaysClasses />
        <PendingAttendanceCard />
      </div>

      <RecentGradesCard />
    </div>
  )
}