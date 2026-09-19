export interface TeacherUser {
  id: string
  email: string
  role?: string
  status: "ACTIVE" | "INACTIVE"
}

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  phone?: string
  status: "ACTIVE" | "INACTIVE"
  user?: TeacherUser
  subjects?: string[] // Optional frontend handling if UI tracks subjects
  createdAt?: string
}

export interface TeacherFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string
  status?: "ACTIVE" | "INACTIVE"
}



export interface TeacherClass {
  id: string
  name: string
  description?: string
  studentsCount: number
  subjects: Array<{
    id: string
    name: string
  }>
}

export interface TeacherStudent {
  id: string
  firstName: string
  lastName: string
  class: {
    id: string
    name: string
  }
  attendanceRate: number
  academicAverage: number
}