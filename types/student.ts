export interface StudentUser {
  id: string
  email: string
  role?: string
  status: "ACTIVE" | "INACTIVE"
}

export interface Student {
  id: string
  firstName: string
  lastName: string
  phone?: string
  status?: "ACTIVE" | "INACTIVE"
  user?: StudentUser
  class?: string // For optional display handling if assigned
  createdAt?: string
}

export interface StudentFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string
}