export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"

export interface TeachingAssignment {
  id: string
  teacherId: string
  subjectId: string
  classId: string
  schoolId: string
  createdAt: string
  teacher: {
    id: string
    firstName: string
    lastName: string
    phone: string
    status: string
  }
  subject: {
    id: string
    name: string
    description: string
  }
  class: {
    id: string
    name: string
    description: string
  }
}

export interface ScheduleSlot {
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
  teacher: {
    id: string
    name: string
  }
}

export interface CreateScheduleSlotPayload {
  teachingAssignmentId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  room: string
}