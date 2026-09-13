export interface SubjectTeachingAssignment {
  id: string
  teacher?: {
    id: string
    firstName: string
    lastName: string
    phone?: string
    status?: string
  }
  class?: {
    id: string
    name: string
    description?: string
  }
}

export interface SubjectItem {
  id: string
  name: string
  description?: string
  teachingAssignmentCount?: number
  createdAt?: string
  updatedAt?: string
  teachingAssignments?: SubjectTeachingAssignment[]
}