export interface DashboardStats {
  totalStudents: number
  studentsGrowthThisMonth: number
  activeTeachers: number
  activeClasses: number
  revenueThisMonth: number
}

export interface TodayAttendance {
  present: number
  absent: number
  late: number
}

export interface WeeklyAttendanceTrendItem {
  day: string
  present: number
  absent: number
  late: number
}

export interface RecentStudent {
  id: string
  firstName: string
  lastName: string
  className: string
  status: string
  joinedAt: string
}

export interface RecentPayment {
  id: string
  studentName: string
  amount: number
  currency: string
  status: "PAID" | "PENDING" | string
  createdAt: string
}