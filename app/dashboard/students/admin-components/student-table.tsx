"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { STUDENTS_QUERY_KEY, STUDENTS_PATH } from "@/lib/queries/students"
import { Student } from "@/types/student"
import { StudentStats } from "./student-stats"
import { StudentTableRowActions } from "./student-table-row-actions"
import { AddStudentDialog } from "./add-student-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, UserPlus, Download } from "lucide-react"

interface StudentsTableProps {
  initialData: Student[]
}

export function StudentsTable({ initialData }: StudentsTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>("all-status")
  const [sortOrder, setSortOrder] = useState<string | null>("newest")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data } = useApiQuery<{ data: Student[] } | Student[]>(
    STUDENTS_QUERY_KEY,
    STUDENTS_PATH
  )

  const rawList = Array.isArray(data)
    ? data
    : (data as any)?.data || initialData

  const studentsList: Student[] = rawList || []

  // Filtering & Sorting Logic
  const filteredStudents = studentsList
    .filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase()
      const email = (student.user?.email || "").toLowerCase()
      const phone = (student.phone || "").toLowerCase()
      const query = search.toLowerCase()

      const matchesSearch =
        fullName.includes(query) || email.includes(query) || phone.includes(query)

      const status = student.status || student.user?.status || "ACTIVE"
      const matchesStatus =
        statusFilter === "all-status" ||
        status.toLowerCase() === statusFilter?.toLowerCase()

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage all students registered in your school.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="h-4 w-4" /> Add Student
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <StudentStats students={studentsList} />

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, or phone..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-background">
              <SelectValue placeholder="all-status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">all-status</SelectItem>
              <SelectItem value="active">active</SelectItem>
              <SelectItem value="inactive">inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Sorting */}
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[120px] bg-background">
              <SelectValue placeholder="newest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">newest</SelectItem>
              <SelectItem value="oldest">oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Table */}
      <Card className="border shadow-xs">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-6">Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => {
                  const status = s.status || s.user?.status || "ACTIVE"
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-semibold pl-6 text-foreground">
                        {s.firstName} {s.lastName}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs sm:text-sm">
                        {s.user?.email || "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs sm:text-sm">
                        {s.phone || "—"}
                      </TableCell>
                      <TableCell>
                        {status === "ACTIVE" ? (
                          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <StudentTableRowActions student={s} />
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No students found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddStudentDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}