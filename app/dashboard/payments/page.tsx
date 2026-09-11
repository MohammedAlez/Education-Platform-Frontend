import { PaymentStats } from "./components/payment-stats"
import { PaymentFilters } from "./components/payment-filters"
import { PaymentTable } from "./components/payment-table"

export default function PaymentsPage() {
  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manually update tuition fees, pending invoices, and balances.
          </p>
        </div>
      </div>

      <PaymentStats />

      <div className="space-y-4">
        <PaymentFilters />
        <PaymentTable />
      </div>
    </div>
  )
}