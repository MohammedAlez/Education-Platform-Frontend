import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recentStudents = [
  { name: "Ahmed Ali", class: "Class A", status: "Active", joined: "Today" },
  { name: "Sara Mohamed", class: "Class B", status: "Active", joined: "Yesterday" },
  { name: "Youssef Karim", class: "Class A", status: "Active", joined: "3 days ago" },
  { name: "Lina Mahmoud", class: "Class C", status: "Active", joined: "4 days ago" },
]

export function RecentStudents() {
  return (
    <Card className="shadow-xs">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Students</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentStudents.map((student, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {student.joined}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}