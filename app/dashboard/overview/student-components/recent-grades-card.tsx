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
import { Award, Loader2 } from "lucide-react"
import { RecentGradesResponse } from "@/types/student-overview"

export function StudentRecentGradesCard() {
  const { data, isLoading } = useApiQuery<RecentGradesResponse>(
    ["student-recent-grades"],
    "/student/me/grades/recent?limit=5"
  )

  const recentGrades = data?.data || []

  return (
    <Card className="border shadow-xs h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Award className="h-4 w-4 text-emerald-600" />
          Recent Grades
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : recentGrades.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">
            No recently submitted grades found.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="pl-6">Subject</TableHead>
                <TableHead className="text-right pr-6">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGrades.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium pl-6 text-xs sm:text-sm capitalize">
                    {g.subjectName}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary pr-6 text-xs sm:text-sm">
                    {g.displayGrade || `${g.grade} / ${g.maxGrade}`}
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