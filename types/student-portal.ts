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


export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface Assessment {
  id: string
  title: string
  type: string
  grade: number | null
  maxGrade: number
  weight: number
  date: string | null
}

export interface StudentSubjectItem {
  subjectId: string
  subjectName: string
  code: string
  teacher: Teacher
  averageGrade: number
  maxGrade: number
  status: "Passing" | "Failing" | "No Grades" | string
  assessments: Assessment[]
}