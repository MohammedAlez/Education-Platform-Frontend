import { fetchWithAuth } from "@/lib/api"
import { requireRole } from "@/lib/user"
import { PaymentsGrid } from "./components/payments-grid"
import { PaymentItem } from "@/types/payment"

export default async function AdminPaymentsPage() {
  await requireRole("ADMIN")

  let initialPayments: PaymentItem[] = []

  try {
    const res = await fetchWithAuth("/payments")
    if (res.ok) {
      const json = await res.json()
      initialPayments = Array.isArray(json) ? json : json.data || []
    }
  } catch (error) {
    console.error("Failed to fetch payments:", error)
  }

  return (
    <div className="p-6">
      <PaymentsGrid initialPayments={initialPayments} />
    </div>
  )
}