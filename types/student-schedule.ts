export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"

export interface StudentScheduleSlot {
  id: string
  subjectId: string
  subjectName: string
  teacherName: string
  startTime: string
  endTime: string
  room: string
}

export interface StudentDaySchedule {
  day: DayOfWeek
  slots: StudentScheduleSlot[]
}

export interface StudentScheduleApiResponse {
  data: StudentDaySchedule[]
}