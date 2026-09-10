"use client"

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
import { MoreHorizontal, Eye, Edit, UserX, KeyRound } from "lucide-react"

const students = [
  {
    id: "1",
    name: "Ahmed Ali",
    email: "ahmed.ali@school.com",
    class: "Class A",
    status: "Active",
  },
  {
    id: "2",
    name: "Sara Ahmed",
    email: "sara.ahmed@school.com",
    class: "Class B",
    status: "Active",
  },
  {
    id: "3",
    name: "Mohammed Karim",
    email: "mohammed.k@school.com",
    class: "Class A",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Lina Mahmoud",
    email: "lina.m@school.com",
    class: "Class C",
    status: "Active",
  },
]

export function StudentTable() {
  return (
    <Card className="shadow-xs border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px] text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/30">
                <TableCell className="font-medium pl-6">
                  {student.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {student.email}
                </TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      student.status === "Active"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                    }
                  >
                    {student.status}
                  </Badge>
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
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <KeyRound className="mr-2 h-4 w-4" />
                        Change Password
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate
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
  )
}