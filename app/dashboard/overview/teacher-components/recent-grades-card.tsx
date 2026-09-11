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

const recentGrades = [
  { student: "Ahmed Ali", subject: "Mathematics", grade: "16/20" },
  { student: "Sara Ahmed", subject: "Mathematics", grade: "18/20" },
]

export function RecentGradesCard() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recently Added Grades</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right pr-6">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentGrades.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-muted/30">
                <TableCell className="font-medium pl-6">{row.student}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-normal">
                    {row.subject}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary pr-6">
                  {row.grade}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}