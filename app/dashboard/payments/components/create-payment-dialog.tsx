"use client"

import { useState } from "react"
import { useApiMutation, useApiQuery } from "@/hooks/use-api"
import { PAYMENTS_QUERY_KEY, PAYMENTS_PATH } from "@/lib/queries/payments"
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
import { PlusCircle } from "lucide-react"

interface CreatePaymentDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePaymentDialog({ isOpen, onClose }: CreatePaymentDialogProps) {
  const [studentId, setStudentId] = useState<string | null>("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState<string | null>("PENDING")
  const [paidAt, setPaidAt] = useState(new Date().toISOString().slice(0, 10))
  const [paymentMethod, setPaymentMethod] = useState<string | null>("CASH")
  const [note, setNote] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const { data: studentsRes } = useApiQuery<any>(["students"], "/students")
  const students = Array.isArray(studentsRes) ? studentsRes : studentsRes?.data || []

  const createPayment = useApiMutation(
    PAYMENTS_PATH,
    "POST",
    PAYMENTS_QUERY_KEY
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!studentId || !amount || !dueDate) {
      setErrorMsg("Student, Amount, and Due Date are required.")
      return
    }

    if (status === "PAID" && !paidAt) {
      setErrorMsg("Payment date (paidAt) is required when status is PAID.")
      return
    }

    const payload: Record<string, any> = {
      studentId,
      amount: Number(amount),
      dueDate: new Date(dueDate).toISOString(),
      status,
      note: note || undefined,
    }

    if (status === "PAID") {
      payload.paidAt = new Date(paidAt).toISOString()
      payload.paymentMethod = paymentMethod
    }

    createPayment.mutate(payload, {
      onSuccess: () => {
        setStudentId("")
        setAmount("")
        setDueDate("")
        setStatus("PENDING")
        setNote("")
        onClose()
      },
      onError: (err: any) => {
        setErrorMsg(err.message || "Failed to create payment.")
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            Create Payment Invoice
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {errorMsg && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-md border border-rose-200/60">
              {errorMsg}
            </p>
          )}

          {/* Student Dropdown */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold">Student</Label>
            <Select value={studentId} onValueChange={setStudentId}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((s: any) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.firstName} {s.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="amount" className="text-xs font-semibold">Amount (DA)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g. 15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <Label htmlFor="dueDate" className="text-xs font-semibold">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
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
                <Label htmlFor="paidAt" className="text-xs font-semibold">Paid Date</Label>
                <Input
                  id="paidAt"
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
            <Label htmlFor="note" className="text-xs font-semibold">Note / Description</Label>
            <Input
              id="note"
              placeholder="e.g. September Tuition"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={createPayment.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={createPayment.isPending}>
              {createPayment.isPending ? "Creating..." : "Save Invoice"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}