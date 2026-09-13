export type PaymentStatus = "PENDING" | "PAID" | "OVERDUE" | "CANCELLED"
export type PaymentMethod = "CASH" | "BANK_TRANSFER" | "CARD"

export interface PaymentItem {
  id: string
  studentId: string
  amount: string | number
  status: PaymentStatus
  dueDate: string
  paidAt?: string | null
  paymentMethod?: PaymentMethod | string | null
  note?: string | null
  createdAt?: string
  updatedAt?: string
  student?: {
    id: string
    firstName: string
    lastName: string
    phone?: string
    status?: string
    user?: {
      id: string
      email: string
    }
  }
}