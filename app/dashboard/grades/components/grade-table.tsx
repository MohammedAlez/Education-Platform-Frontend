"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const gradeRecords = [
  {
    id: "1",
    studentName: "Sara Ahmed",
    className: "Class A",
    average: "17.2",
    status: "Excellent",
  },
  {
    id: "2",
    studentName: "Ahmed Ali",
    className: "Class A",
    average: "15.8",
    status: "Good",
  },
  {
    id: "3",
    studentName: "Yassine Mansouri",
    className: "Class B",
    average: "11.4",
    status: "Average",
  },
  {
    id: "4",
    studentName: "Lina Hadj",
    className: "Class C",
    average: "08.5",
    status: "Needs Improvement",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Excellent":
      return (
        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          Excellent
        </Badge>
      )
    case "Good":
      return (
        <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
          Good
        </Badge>
      )
    case "Average":
      return (
        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
          Average
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
          Needs Improvement
        </Badge>
      )
  }
}

export function GradeTable() {
  return (
    <Card className="shadow-xs border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Average Grade</TableHead>
              <TableHead className="text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gradeRecords.map((record) => (
              <TableRow key={record.id} className="hover:bg-muted/30">
                <TableCell className="font-medium pl-6">
                  {record.studentName}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                    {record.className}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  {record.average} / 20
                </TableCell>
                <TableCell className="text-right pr-6">
                  {getStatusBadge(record.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}