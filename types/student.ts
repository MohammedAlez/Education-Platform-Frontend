export interface StudentUser {
  id: string
  email: string
  role?: string
  status: "ACTIVE" | "INACTIVE"
}

export interface Enrollment {
  id: string
  class: {
    id: string;
    name: string;
    description: string;
    schoolId: string;
    createdAt: string;
    updatedAt: string;
  };
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
  enrollments: Enrollment[];
}

export interface StudentFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string
}