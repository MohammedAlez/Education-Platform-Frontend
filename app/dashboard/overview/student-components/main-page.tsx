"use client"

import { StudentStatsCards } from "./student-stats-cards"
import { StudentTodaysClasses } from "./todays-classes"
import { StudentRecentGradesCard } from "./recent-grades-card"
import { AttendanceBreakdownCard } from "./attendance-breakdown-card"

export function StudentDashboardPage() {
  return (
    <div className="space-y-6 p-2">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Here's your academic overview.
        </p>
      </div>

      {/* Overview Metric Cards */}
      <StudentStatsCards />

      {/* Main Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <StudentTodaysClasses />
        </div>

        <div className="lg:col-span-1">
          <StudentRecentGradesCard />
        </div>

        <div className="lg:col-span-1">
          <AttendanceBreakdownCard />
        </div>
      </div>
    </div>
  )
}