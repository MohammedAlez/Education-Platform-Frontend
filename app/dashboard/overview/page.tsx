import { KpiCards } from "./admin-components/kpi-cards"
import { AttendanceOverview } from "./admin-components/attendance-overview"
import { AttendanceChart } from "./admin-components/attendance-chart"
import { RecentStudents } from "./admin-components/recent-students"
import { RecentPayments } from "./admin-components/recent-payments"
import { QuickActions } from "./admin-components/quick-actions"
import { getCurrentUser } from "@/lib/user"
import { RecentGradesCard } from "./teacher-components/recent-grades-card"
import { PendingAttendanceCard } from "./teacher-components/pending-attendance-card"
import { TodaysClasses } from "./teacher-components/todays-classes"
import { TeacherStats } from "./teacher-components/teacher-stats"
import { Role } from "@/lib/rbac"

export default async function Overview() {
  const currentUser = await getCurrentUser()
  // const userRole = currentUser?.role 
  const userRole:Role = "TEACHER"

  if (userRole === "ADMIN") {
    return <AdminDashboardPage />
  }else if (userRole === "TEACHER") {
    return <TeacherDashboardPage />
  }
  return <div>Access Denied</div>
}


function AdminDashboardPage() {
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

function TeacherDashboardPage() {

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Good morning, Ahmed 👋</h1>
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

function StudentDashboardPage() {

}