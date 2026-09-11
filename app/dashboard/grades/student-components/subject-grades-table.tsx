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
import { ChevronRight, GraduationCap } from "lucide-react"
import { SubjectGradeDetail } from "./grade-history-sheet"

interface SubjectGradesTableProps {
  subjects: SubjectGradeDetail[]
  onSelectSubject: (subject: SubjectGradeDetail) => void
}

export function SubjectGradesTable({ subjects, onSelectSubject }: SubjectGradesTableProps) {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b bg-muted/20">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-primary" />
          Enrolled Subjects Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead className="text-right pr-6">Average Marks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((item) => (
              <TableRow
                key={item.id}
                onClick={() => onSelectSubject(item)}
                className="cursor-pointer hover:bg-muted/30 transition-colors group"
              >
                <TableCell className="font-semibold text-sm pl-6 text-foreground group-hover:text-primary transition-colors">
                  {item.subject}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex items-center justify-end gap-3">
                    <span className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {item.average} <span className="text-xs text-muted-foreground font-normal">/ 20</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}