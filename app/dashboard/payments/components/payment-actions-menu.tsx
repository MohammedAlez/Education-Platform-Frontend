"use client"

import { useState } from "react"
import { useApiMutation } from "@/hooks/use-api"
import { PAYMENTS_QUERY_KEY } from "@/lib/queries/payments"
import { UpdatePaymentDialog } from "./update-payment-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, CheckCircle, Clock, AlertTriangle, Pencil } from "lucide-react"
import { PaymentItem } from "@/types/payment"

interface PaymentActionsMenuProps {
  payment: PaymentItem
}

export function PaymentActionsMenu({ payment }: PaymentActionsMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const updatePayment = useApiMutation(
    `/payments/${payment.id}`,
    "PATCH",
    PAYMENTS_QUERY_KEY
  )

  const handleMarkStatus = (status: string, paymentMethod = "CASH") => {
    const payload: Record<string, any> = { status }

    if (status === "PAID") {
      payload.paidAt = new Date().toISOString()
      payload.paymentMethod = paymentMethod
    } else {
      payload.paidAt = null
      payload.paymentMethod = null
    }

    updatePayment.mutate(payload, {
      onSuccess: () => setIsMenuOpen(false),
    })
  }

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        {/* Render a styled button directly as the trigger to prevent nested buttons */}
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            />
          }
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {/* Wrapped labels inside DropdownMenuGroup to fulfill Base UI context requirements */}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                setIsMenuOpen(false)
                setIsEditOpen(true)
              }}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4 text-primary" />
              Edit Invoice Details
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Quick Status
            </DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => handleMarkStatus("PAID", "CASH")}
              disabled={updatePayment.isPending}
              className="cursor-pointer"
            >
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
              Mark Paid (Cash)
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleMarkStatus("PAID", "BANK_TRANSFER")}
              disabled={updatePayment.isPending}
              className="cursor-pointer"
            >
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
              Mark Paid (Bank)
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleMarkStatus("PAID", "CCP")}
              disabled={updatePayment.isPending}
              className="cursor-pointer"
            >
              <CheckCircle className="mr-2 h-4 w-4 text-emerald-600" />
              Mark Paid (CCP)
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleMarkStatus("PENDING")}
              disabled={updatePayment.isPending}
              className="cursor-pointer"
            >
              <Clock className="mr-2 h-4 w-4 text-amber-600" />
              Mark Pending
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleMarkStatus("OVERDUE")}
              disabled={updatePayment.isPending}
              className="cursor-pointer"
            >
              <AlertTriangle className="mr-2 h-4 w-4 text-rose-600" />
              Mark Overdue
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Invoice Dialog */}
      {isEditOpen && (
        <UpdatePaymentDialog
          payment={payment}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  )
}