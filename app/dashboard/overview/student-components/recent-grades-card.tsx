"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Award } from "lucide-react"

const recentGrades = [
  { subject: "Mathematics", grade: "17 / 20" },
  { subject: "Physics", grade: "15 / 20" },
  { subject: "Computer Science", grade: "18 / 20" },
]

export function RecentGradesCard() {
  return (
    <Card className="border shadow-xs h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-600" />
          Recent Grades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead className="text-right pr-6">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentGrades.map((g, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium pl-6 text-xs sm:text-sm">
                  {g.subject}
                </TableCell>
                <TableCell className="text-right font-bold text-primary pr-6 text-xs sm:text-sm">
                  {g.grade}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}