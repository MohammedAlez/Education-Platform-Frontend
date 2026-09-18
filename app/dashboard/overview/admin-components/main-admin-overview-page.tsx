"use client"

import { useApiQuery } from "@/hooks/use-api"
import {
  DASHBOARD_STATS_PATH,
  DASHBOARD_STATS_QUERY_KEY,
  TODAY_ATTENDANCE_PATH,
  TODAY_ATTENDANCE_QUERY_KEY,
  WEEKLY_ATTENDANCE_PATH,
  WEEKLY_ATTENDANCE_QUERY_KEY,
  RECENT_STUDENTS_PATH,
  RECENT_STUDENTS_QUERY_KEY,
  RECENT_PAYMENTS_PATH,
  RECENT_PAYMENTS_QUERY_KEY,
} from "@/lib/queries/dashboard"
import { OverviewStatsCards } from "./overview-stats-cards"
import { AttendanceOverview } from "./attendance-overview"
import { RecentDataTables } from "./recent-data-tables"

export function AdminOverviewPage() {
  // Fetch Stats
  const { data: statsRes, isLoading: isStatsLoading } = useApiQuery<any>(
    DASHBOARD_STATS_QUERY_KEY,
    DASHBOARD_STATS_PATH
  )
  const stats = statsRes?.data || statsRes

  // Fetch Today's Attendance
  const { data: todayRes, isLoading: isTodayLoading } = useApiQuery<any>(
    TODAY_ATTENDANCE_QUERY_KEY,
    TODAY_ATTENDANCE_PATH
  )
  const todayAttendance = todayRes?.data || todayRes

  // Fetch Weekly Attendance Trend
  const { data: weeklyRes, isLoading: isWeeklyLoading } = useApiQuery<any>(
    WEEKLY_ATTENDANCE_QUERY_KEY,
    WEEKLY_ATTENDANCE_PATH
  )
  const weeklyAttendance = Array.isArray(weeklyRes) ? weeklyRes : weeklyRes?.data || []

  // Fetch Recent Students
  const { data: studentsRes, isLoading: isStudentsLoading } = useApiQuery<any>(
    RECENT_STUDENTS_QUERY_KEY,
    RECENT_STUDENTS_PATH
  )
  const recentStudents = Array.isArray(studentsRes) ? studentsRes : studentsRes?.data || []

  // Fetch Recent Payments
  const { data: paymentsRes, isLoading: isPaymentsLoading } = useApiQuery<any>(
    RECENT_PAYMENTS_QUERY_KEY,
    RECENT_PAYMENTS_PATH
  )
  const recentPayments = Array.isArray(paymentsRes) ? paymentsRes : paymentsRes?.data || []

  return (
    <div className="space-y-6 p-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          Good morning 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's what's happening at your school today.
        </p>
      </div>

      {/* Overview Stats Cards */}
      <OverviewStatsCards stats={stats} isLoading={isStatsLoading} />

      {/* Attendance Metrics & Trends */}
      <AttendanceOverview
        todayData={todayAttendance}
        isTodayLoading={isTodayLoading}
        weeklyData={weeklyAttendance}
        isWeeklyLoading={isWeeklyLoading}
      />

      {/* Recent Activity Tables */}
      <RecentDataTables
        students={recentStudents}
        isStudentsLoading={isStudentsLoading}
        payments={recentPayments}
        isPaymentsLoading={isPaymentsLoading}
      />
    </div>
  )
}