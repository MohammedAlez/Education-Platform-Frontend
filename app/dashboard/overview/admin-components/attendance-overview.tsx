"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CheckCircle2, XCircle, Clock } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { TodayAttendance, WeeklyAttendanceTrendItem } from "@/types/dashboard"

interface AttendanceOverviewProps {
  todayData?: TodayAttendance
  isTodayLoading: boolean
  weeklyData: WeeklyAttendanceTrendItem[]
  isWeeklyLoading: boolean
}

export function AttendanceOverview({
  todayData,
  isTodayLoading,
  weeklyData,
  isWeeklyLoading,
}: AttendanceOverviewProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Today's Attendance Breakdown */}
      <Card className="rounded-xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {isTodayLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))
          ) : (
            <>
              <div className="flex items-center justify-between p-3 border rounded-lg bg-emerald-50/30 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-medium">Present</span>
                </div>
                <span className="text-lg font-bold">{todayData?.present ?? 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-rose-50/30 border-rose-100 dark:bg-rose-950/10 dark:border-rose-900/20">
                <div className="flex items-center gap-2.5">
                  <XCircle className="h-5 w-5 text-rose-600" />
                  <span className="text-sm font-medium">Absent</span>
                </div>
                <span className="text-lg font-bold">{todayData?.absent ?? 0}</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-amber-50/30 border-amber-100 dark:bg-amber-950/10 dark:border-amber-900/20">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-sm font-medium">Late</span>
                </div>
                <span className="text-lg font-bold">{todayData?.late ?? 0}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Weekly Attendance Trend Chart */}
      <Card className="lg:col-span-2 rounded-xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Weekly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[220px]">
          {isWeeklyLoading ? (
            <Skeleton className="h-full w-full rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="absent" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Absent" />
                <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Late" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}