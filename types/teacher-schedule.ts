export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"

// Response from GET /api/teachers/classes
export interface TeacherAssignedClass {
  id: string
  name: string
  description: string
  studentsCount: number
  subjects: {
    id: string
    name: string
    teachingAssignmentId: string
  }[]
}

// Response from GET /api/shedules/teacher/me
export interface TeacherScheduleSlot {
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