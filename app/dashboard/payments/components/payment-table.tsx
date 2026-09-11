"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MarkPaidDialog } from "./mark-paid-dialog"
import { MoreHorizontal, Eye, CheckCircle2, Edit } from "lucide-react"

const paymentRecords = [
  {
    id: "1",
    studentName: "Ahmed Ali",
    amount: "15,000 DA",
    method: "Cash",
    status: "Paid",
  },
  {
    id: "2",
    studentName: "Sara Ahmed",
    amount: "15,000 DA",
    method: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "3",
    studentName: "Mohammed Khelil",
    amount: "15,000 DA",
    method: "—",
    status: "Pending",
  },
  {
    id: "4",
    studentName: "Yassine Mansouri",
    amount: "15,000 DA",
    method: "—",
    status: "Overdue",
  },
]

export function PaymentTable() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleMarkPaid = (name: string) => {
    setSelectedStudent(name)
    setDialogOpen(true)
  }

  return (
    <>
      <Card className="shadow-xs border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="pl-6">Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px] text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium pl-6">
                    {record.studentName}
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    {record.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.method}
                  </TableCell>
                  <TableCell>
                    {record.status === "Paid" && (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                        Paid
                      </Badge>
                    )}
                    {record.status === "Pending" && (
                      <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                        Pending
                      </Badge>
                    )}
                    {record.status === "Overdue" && (
                      <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                        Overdue
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {record.status !== "Paid" && (
                          <DropdownMenuItem
                            className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                            onClick={() => handleMarkPaid(record.studentName)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MarkPaidDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        studentName={selectedStudent ?? undefined}
      />
    </>
  )
}