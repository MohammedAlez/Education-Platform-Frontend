"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit } from "lucide-react"

interface EditPaymentSheetProps {
  payment: {
    studentName: string
    amount: string
    status: string
    method: string
    date: string
  }
}

export function EditPaymentSheet({ payment }: EditPaymentSheetProps) {
  return (
    <Sheet>
      <SheetTrigger >
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Payment
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Payment Details</SheetTitle>
          <SheetDescription>
            Update payment status, amount, or payment method for this transaction.
          </SheetDescription>
        </SheetHeader>

        <form className="space-y-6 pt-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label>Student Name</Label>
            <Input value={payment.studentName} disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (DA)</Label>
            <Input id="amount" defaultValue={payment.amount} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Payment Status</Label>
            <Select defaultValue={payment.status.toLowerCase()}>
              <SelectTrigger id="status" className="bg-background">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">PAID</SelectItem>
                <SelectItem value="pending">PENDING</SelectItem>
                <SelectItem value="overdue">OVERDUE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Payment Method</Label>
            <Select defaultValue={payment.method.toLowerCase().replace(" ", "-")}>
              <SelectTrigger id="method" className="bg-background">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="check">Check</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Payment Date</Label>
            <Input id="date" type="date" defaultValue="2026-09-01" />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}