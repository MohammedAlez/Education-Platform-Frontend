import { KpiCards } from "./components/kpi-cards"
import { AttendanceOverview } from "./components/attendance-overview"
import { AttendanceChart } from "./components/attendance-chart"
import { RecentStudents } from "./components/recent-students"
import { RecentPayments } from "./components/recent-payments"
import { QuickActions } from "./components/quick-actions"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-3">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Good morning, Ahmed 👋
        </h1>
        <p className="text-sm text-muted-foreground">
          Here's what's happening at your school today.
        </p>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Quick Actions */}
      <QuickActions />

      {/* Attendance Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AttendanceOverview />
        </div>
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
      </div>

      {/* Data Tables Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentStudents />
        <RecentPayments />
      </div>
    </div>
  )
}