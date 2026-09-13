export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"

export interface AttendanceRecord {
  id: string
  studentId: string
  teachingAssignmentId: string
  date: string
  status: AttendanceStatus
  note?: string | null
  student?: {
    id: string
    firstName: string
    lastName: string
    phone?: string
  }
  teachingAssignment?: {
    id: string
    teacherId?: string
    subjectId?: string
    classId?: string
    teacher?: {
      id: string
      firstName: string
      lastName: string
    }
    subject?: {
      id: string
      name: string
    }
    class?: {
      id: string
      name: string
    }
  }
}

export interface StudentAttendanceSummary {
  studentId: string
  studentName: string
  className: string
  presentCount: number
  absentCount: number
  lateCount: number
}