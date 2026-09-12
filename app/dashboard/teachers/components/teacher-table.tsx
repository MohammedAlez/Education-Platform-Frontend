"use client"

import { useState } from "react"
import { useApiQuery } from "@/hooks/use-api"
import { TEACHERS_QUERY_KEY, TEACHERS_PATH } from "@/lib/queries/teachers"
import { Teacher } from "@/types/teacher"
import { TeacherStats } from "./teacher-stats"
import { TeacherTableRowActions } from "./teacher-table-row-actions"
import { AddTeacherDialog } from "./add-teacher-dialog"
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

interface TeachersTableProps {
  initialData: Teacher[]
}

export function TeachersTable({ initialData }: TeachersTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Client-side query syncing with server state
  const { data } = useApiQuery<{ data: Teacher[] } | Teacher[]>(
    TEACHERS_QUERY_KEY,
    TEACHERS_PATH
  )

  const rawList = Array.isArray(data)
    ? data
    : (data as any)?.data || initialData

  const teachersList: Teacher[] = rawList || []

  // Filter Logic
  const filteredTeachers = teachersList.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase()
    const email = (teacher.user?.email || "").toLowerCase()
    const query = search.toLowerCase()

    const matchesSearch = fullName.includes(query) || email.includes(query)
    const matchesStatus =
      statusFilter === "all" ||
      teacher.status?.toLowerCase() === statusFilter?.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage teaching staff and their account assignments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="h-4 w-4" /> Add Teacher
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <TeacherStats teachers={teachersList} />

      {/* Search & Select Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-9 bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-background">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
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
                <TableHead className="pl-6">Teacher</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-semibold pl-6 text-foreground">
                      {t.firstName} {t.lastName}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs sm:text-sm">
                      {t.user?.email || "—"}
                    </TableCell>
                    <TableCell>
                      {t.status === "ACTIVE" ? (
                        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200/60">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200/60">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <TeacherTableRowActions teacher={t} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    No teachers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddTeacherDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}