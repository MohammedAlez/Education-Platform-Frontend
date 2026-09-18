"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { StudentAverageItem } from "@/types/grade"

interface StudentAveragesTableProps {
  averages: StudentAverageItem[]
  isLoading: boolean
}

export function StudentAveragesTable({ averages, isLoading }: StudentAveragesTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "EXCELLENT":
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">Excellent</Badge>
      case "GOOD":
        return <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-100 border-none">Good</Badge>
      case "AVERAGE":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">Average</Badge>
      case "NEEDS_IMPROVEMENT":
      default:
        return <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-none">Needs Improvement</Badge>
    }
  }

  return (
    <Card className="rounded-xl shadow-sm border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="py-3.5 pl-6">Student</TableHead>
              <TableHead className="py-3.5">Class</TableHead>
              <TableHead className="py-3.5">Average Grade</TableHead>
              <TableHead className="py-3.5 text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell className="py-4 pl-6"><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell className="py-4"><Skeleton className="h-5 w-16 rounded-full" /></TableCell>
                  <TableCell className="py-4"><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell className="py-4 text-right pr-6"><Skeleton className="h-5 w-20 ml-auto rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : averages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  No student grades found matching the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              averages.map((row) => (
                <TableRow key={row.student?.id || Math.random()} className="hover:bg-muted/40">
                  <TableCell className="font-medium py-3.5 pl-6">
                    {row.student ? `${row.student.firstName} ${row.student.lastName}` : "—"}
                  </TableCell>
                  <TableCell className="py-3.5">
                    <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 font-normal">
                      {row.class?.name || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-purple-600 py-3.5">
                    {row.averageGrade !== undefined ? Number(row.averageGrade).toFixed(1) : "0.0"} / 20
                  </TableCell>
                  <TableCell className="text-right py-3.5 pr-6">
                    {getStatusBadge(row.status)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}