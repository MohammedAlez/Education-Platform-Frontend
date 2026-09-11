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
import { TodaysClasses as StudentTodaysClasses } from "./student-components/todays-classes"
import { TeacherStats } from "./teacher-components/teacher-stats"
import { Role } from "@/lib/rbac"
import { AttendanceBreakdownCard } from "./student-components/attendance-breakdown-card"
import { StudentStatsCards } from "./student-components/student-stats-cards"
import { RecentGradesCard as StudentRecentGradesCard } from "./teacher-components/recent-grades-card"

export default async function Overview() {
  const currentUser = await getCurrentUser()
  // const userRole = currentUser?.role 
  const userRole:Role = "STUDENT"

  if (userRole === "ADMIN") {
    return <AdminDashboardPage />
  }else if (userRole === "TEACHER") {
    return <TeacherDashboardPage />
  }
  return <StudentDashboardPage />
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
  const studentName = "Ahmed"

  return (
    <div className="space-y-6 p-2">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {studentName} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Here's your academic overview.
        </p>
      </div>

      {/* Overview Cards */}
      <StudentStatsCards />

      {/* Main Grid Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-1">
          <StudentTodaysClasses />
        </div>

        {/* Recent Grades */}
        <div className="lg:col-span-1">
          <StudentRecentGradesCard />
        </div>

        {/* Attendance Breakdown */}
        <div className="lg:col-span-1">
          <AttendanceBreakdownCard />
        </div>
      </div>
    </div>
  )
}