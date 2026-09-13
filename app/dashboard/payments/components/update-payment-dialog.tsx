"use client"

import { useState, useEffect } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { PAYMENTS_QUERY_KEY } from "@/lib/queries/payments"
import { PaymentItem } from "@/types/payment"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

interface UpdatePaymentDialogProps {
  payment: PaymentItem
  isOpen: boolean
  onClose: () => void
}

export function UpdatePaymentDialog({ payment, isOpen, onClose }: UpdatePaymentDialogProps) {
  const [amount, setAmount] = useState(String(payment.amount || ""))
  const [dueDate, setDueDate] = useState(
    payment.dueDate ? new Date(payment.dueDate).toISOString().slice(0, 10) : ""
  )
  const [status, setStatus] = useState<string | null>(payment.status || "PENDING")
  const [paidAt, setPaidAt] = useState(
    payment.paidAt
      ? new Date(payment.paidAt).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  )
  const [paymentMethod, setPaymentMethod] = useState<string | null>(payment.paymentMethod || "CASH")
  const [note, setNote] = useState(payment.note || "")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    setAmount(String(payment.amount || ""))
    setDueDate(payment.dueDate ? new Date(payment.dueDate).toISOString().slice(0, 10) : "")
    setStatus(payment.status || "PENDING")
    setPaidAt(
      payment.paidAt
        ? new Date(payment.paidAt).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10)
    )
    setPaymentMethod(payment.paymentMethod || "CASH")
    setNote(payment.note || "")
  }, [payment])

  const updatePayment = useApiMutation(
    `/payments/${payment.id}`,
    "PATCH",
    PAYMENTS_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (status === "PAID" && !paidAt) {
      setErrorMsg("Payment date (paidAt) is required when status is PAID.")
      return
    }

    const payload: Record<string, any> = {
      amount: Number(amount),
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      status,
      note: note || undefined,
    }

    if (status === "PAID") {
      payload.paidAt = new Date(paidAt).toISOString()
      payload.paymentMethod = paymentMethod
    } else {
      payload.paidAt = null
      payload.paymentMethod = null
    }

    updatePayment.mutate(payload, {
      onSuccess: () => {
        onClose()
      },
      onError: (err: any) => {
        setErrorMsg(err.message || "Failed to update payment.")
      },
    })
  }

  const studentName = payment.student
    ? `${payment.student.firstName} ${payment.student.lastName}`
    : "Student"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-4 w-4 text-primary" />
            Edit Invoice — {studentName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-amount" className="text-xs font-semibold">Amount (DA)</Label>
            <Input
              id="edit-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-dueDate" className="text-xs font-semibold">Due Date</Label>
            <Input
              id="edit-dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Payment Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="PAID">PAID</SelectItem>
                <SelectItem value="OVERDUE">OVERDUE</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Paid Date & Method Fields */}
          {status === "PAID" && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-muted/40 rounded-lg border">
              <div className="space-y-1.5">
                <Label htmlFor="edit-paidAt" className="text-xs font-semibold">Paid Date</Label>
                <Input
                  id="edit-paidAt"
                  type="date"
                  value={paidAt}
                  onChange={(e) => setPaidAt(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH">CASH</SelectItem>
                    <SelectItem value="BANK_TRANSFER">BANK_TRANSFER</SelectItem>
                    <SelectItem value="CCP">CCP</SelectItem>
                    <SelectItem value="OTHER">OTHER</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Note */}
          <div className="space-y-1.5">
            <Label htmlFor="edit-note" className="text-xs font-semibold">Note / Description</Label>
            <Input
              id="edit-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={updatePayment.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={updatePayment.isPending}>
              {updatePayment.isPending ? "Updating..." : "Update Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}