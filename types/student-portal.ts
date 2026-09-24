export interface StudentClassSummary {
  id: string
  name: string
  code: string
}

export interface StudentSubject {
  id: string
  name: string
  code: string
  status: string
}

export interface StudentTeacher {
  id: string
  firstName: string
  lastName: string
  subjectName: string
  email: string
}

export interface StudentClassDetail {
  id: string
  name: string
  description?: string
  studentCount: number
  subjects: StudentSubject[]
  teachers: StudentTeacher[]
}