import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const assignments = [
  { subject: "Mathematics", class: "Class A" },
  { subject: "Mathematics", class: "Class B" },
  { subject: "Advanced Algebra", class: "Class C" },
]

export function TabAssignments() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Teaching Assignments</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Subject</TableHead>
              <TableHead className="text-right pr-6">Assigned Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium pl-6">{item.subject}</TableCell>
                <TableCell className="text-right pr-6">
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                    {item.class}
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