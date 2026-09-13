import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { TeachingAssignment } from "@/types/class"

interface AssignmentsTableProps {
  assignments: TeachingAssignment[]
}

export function AssignmentsTable({ assignments }: AssignmentsTableProps) {
  return (
    <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="font-semibold text-xs">Teacher</TableHead>
            <TableHead className="font-semibold text-xs">Subject</TableHead>
            <TableHead className="font-semibold text-xs">Class</TableHead>
            <TableHead className="w-[80px] text-right font-semibold text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.length > 0 ? (
            assignments.map((assignment) => {
              const teacherName = assignment.teacher
                ? `${assignment.teacher.firstName} ${assignment.teacher.lastName}`
                : "Unknown Teacher"

              return (
                <TableRow key={assignment.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-sm">
                    {teacherName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-amber-100/70 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/40 dark:text-amber-300 font-medium capitalize"
                    >
                      {assignment.subject?.name || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-purple-100/70 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/40 dark:text-purple-300 font-medium"
                    >
                      {assignment.class?.name || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                No teaching assignments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}