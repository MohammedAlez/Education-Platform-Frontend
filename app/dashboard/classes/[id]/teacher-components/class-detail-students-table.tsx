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

const classStudentsList = [
  { id: "1", name: "Ahmed Ali", attendance: "95%", average: "16.2 / 20" },
  { id: "2", name: "Sara Ahmed", attendance: "98%", average: "17.5 / 20" },
  { id: "3", name: "Yassine Mansouri", attendance: "88%", average: "12.0 / 20" },
  { id: "4", name: "Lina Hadj", attendance: "100%", average: "18.8 / 20" },
]

export function ClassDetailStudentsTable() {
  return (
    <Card className="shadow-xs border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Student</TableHead>
              <TableHead>Attendance Rate</TableHead>
              <TableHead className="text-right pr-6">Average Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classStudentsList.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/30">
                <TableCell className="font-medium pl-6">
                  {student.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-sky-200 bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                  >
                    {student.attendance}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-primary pr-6">
                  {student.average}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}