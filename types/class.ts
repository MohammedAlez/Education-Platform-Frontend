export interface ClassItem {
  id: string
  name: string
  description?: string
  studentCount?: number
  teachingAssignmentCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface TeachingAssignment {
  id: string
  teacherId: string
  subjectId: string
  classId: string
  schoolId?: string
  teacher?: {
    id: string
    firstName: string
    lastName: string
    phone?: string
    status?: string
  }
  subject?: {
    id: string
    name: string
    description?: string
  }
  class?: {
    id: string
    name: string
    description?: string
  }
  createdAt?: string
}