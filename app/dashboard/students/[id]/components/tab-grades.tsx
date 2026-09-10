import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const grades = [
  { subject: "Mathematics", average: "15.4 / 20" },
  { subject: "Physics", average: "14.8 / 20" },
  { subject: "Computer Science", average: "17.2 / 20" },
]

export function TabGrades() {
  return (
    <Card className="shadow-xs border">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead className="text-right pr-6">Average Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grades.map((item) => (
              <TableRow key={item.subject}>
                <TableCell className="font-medium pl-6">{item.subject}</TableCell>
                <TableCell className="text-right pr-6 font-semibold text-primary">
                  {item.average}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}