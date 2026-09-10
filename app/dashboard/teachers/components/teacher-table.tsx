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

const teachers = [
  {
    id: "1",
    name: "Ahmed Benali",
    email: "ahmed.benali@school.com",
    subjects: ["Mathematics"],
    status: "Active",
  },
  {
    id: "2",
    name: "Sara Ali",
    email: "sara.ali@school.com",
    subjects: ["Physics", "Chemistry"],
    status: "Active",
  },
  {
    id: "3",
    name: "Karim Hassan",
    email: "karim.hassan@school.com",
    subjects: ["Computer Science"],
    status: "Inactive",
  },
]

export function TeacherTable() {
  return (
    <Card className="shadow-xs border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Teacher</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px] text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id} className="hover:bg-muted/30">
                <TableCell className="font-medium pl-6">
                  {teacher.name}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {teacher.email}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((sub) => (
                      <Badge key={sub} variant="secondary" className="bg-accent text-accent-foreground font-normal">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      teacher.status === "Active"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                    }
                  >
                    {teacher.status}
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