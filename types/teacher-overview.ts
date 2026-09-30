export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"

// GET /api/teacher/me/overview/stats
export interface TeacherOverviewStats {
  classesCount: number
  studentsCount: number
  subjectsCount: number
  todayClassesCount: number
}

// GET /api/schedules/teacher/me?day=...
export interface TeacherTodaySchedule {
  id: string
  teachingAssignmentId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
  subject: {
    id: string
    name: string
  }
  class: {
    id: string
    name: string
  }
}

// GET /api/teacher/me/attendance/pending
export interface PendingAttendanceItem {
  scheduleId: string
  teachingAssignmentId: string
  className: string
  classId: string
  subjectName: string
  startTime: string
  endTime: string
  room: string
  date: string
  status: string
}

// GET /api/teacher/me/grades/recent
export interface RecentGradeItem {
  id: string
  studentName: string
  subjectName: string
  className: string
  type: string
  grade: number
  maxGrade: number
  displayGrade: string
  date: string
  note: string
}