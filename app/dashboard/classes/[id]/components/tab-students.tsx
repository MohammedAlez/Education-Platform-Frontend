import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const students = [
  { id: "1", name: "Ahmed Ali", email: "ahmed@example.com", status: "Active" },
  { id: "2", name: "Yassine Mansouri", email: "yassine@example.com", status: "Active" },
  { id: "3", name: "Lina Hadj", email: "lina@example.com", status: "Inactive" },
]

export function TabStudents() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Enrolled Students</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="pl-6">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium pl-6">{student.name}</TableCell>
                <TableCell className="text-muted-foreground">{student.email}</TableCell>
                <TableCell className="text-right pr-6">
                  <Badge
                    variant="outline"
                    className={
                      student.status === "Active"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "border-rose-200 bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                    }
                  >
                    {student.status}
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