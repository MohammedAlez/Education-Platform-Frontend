import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const teacherAssignments = [
  { subject: "Mathematics", teacher: "Ahmed Benali" },
  { subject: "Physics", teacher: "Sara Ali" },
  { subject: "Computer Science", teacher: "Mohammed Khelifi" },
]

export function TabTeachers() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Assigned Teachers</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead className="text-right pr-6">Assigned Instructor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherAssignments.map((item) => (
              <TableRow key={item.subject}>
                <TableCell className="font-medium pl-6">{item.subject}</TableCell>
                <TableCell className="text-right pr-6">
                  <Badge variant="secondary" className="bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 font-normal">
                    {item.teacher}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}