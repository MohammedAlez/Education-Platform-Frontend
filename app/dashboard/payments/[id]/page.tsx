import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PaymentDetailCard } from "./components/payment-detail-card"
import { EditPaymentSheet } from "./components/edit-payment-sheet"
import { ArrowLeft } from "lucide-react"

export default function PaymentDetailsPage({ params }: { params: { id: string } }) {
  // Mock data matching the requested specification
  const payment = {
    id: params.id,
    studentName: "Ahmed Ali",
    amount: "15,000 DA",
    status: "PAID" as const,
    method: "Cash",
    date: "September 1, 2026",
  }

  return (
    <div className="space-y-6 p-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Link href="/dashboard/payments">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payment Details</h1>
            <p className="text-sm text-muted-foreground">
              Transaction record #{payment.id}
            </p>
          </div>
        </div>

        <EditPaymentSheet payment={payment} />
      </div>

      <PaymentDetailCard payment={payment} />
    </div>
  )
}