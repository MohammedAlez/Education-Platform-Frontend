"use client"

import { useApiQuery } from "@/hooks/use-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { RecentGradeItem } from "@/types/teacher-overview"

export function RecentGradesCard() {
  const { data: gradesResponse, isLoading } = useApiQuery<
    { data: RecentGradeItem[] } | RecentGradeItem[]
  >(["recent-grades"], "/teacher/me/grades/recent?limit=5")

  const recentGrades: RecentGradeItem[] = Array.isArray(gradesResponse)
    ? gradesResponse
    : (gradesResponse as any)?.data || []

  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recently Added Grades</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex h-28 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : recentGrades.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            No recently submitted grades found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="pl-6">Student</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right pr-6">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGrades.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium pl-6">
                    {row.studentName}
                    {row.className && (
                      <span className="text-xs text-muted-foreground ml-2">
                        ({row.className})
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-normal capitalize"
                    >
                      {row.subjectName}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary pr-6">
                    {row.displayGrade || `${row.grade}/${row.maxGrade}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}