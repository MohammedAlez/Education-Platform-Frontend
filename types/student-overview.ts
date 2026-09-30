export interface OverviewStatsResponse {
  data: {
    className: string
    averageGrade: string
    attendanceRate: string
    subjectsCount: number
    attendanceSummary: {
      present: number
      absent: number
      late: number
    }
  }
}

export interface TodayClassItem {
  id: string
  subjectName: string
  room: string
  teacherName: string
  startTime: string
  endTime: string
}

export interface TodayClassesResponse {
  data: TodayClassItem[]
}

export interface RecentGradeItem {
  id: string
  subjectName: string
  grade: number
  maxGrade: number
  displayGrade?: string
  date: string
}

export interface RecentGradesResponse {
  data: RecentGradeItem[]
}