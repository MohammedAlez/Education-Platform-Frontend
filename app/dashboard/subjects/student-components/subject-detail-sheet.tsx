"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Award, User, BookOpen } from "lucide-react"
import { StudentSubjectItem } from "@/types/student-portal"
import { cn } from "@/lib/utils"

interface SubjectDetailSheetProps {
  subject: StudentSubjectItem | null
  isOpen: boolean
  onClose: () => void
}

export function SubjectDetailSheet({ subject, isOpen, onClose }: SubjectDetailSheetProps) {
  if (!subject) return null

  const teacherFullName = `${subject.teacher.firstName} ${subject.teacher.lastName}`.trim()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Passing":
        return (
          <Badge variant="outline" className="text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60">
            Passing
          </Badge>
        )
      case "Failing":
        return (
          <Badge variant="outline" className="text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/60">
            Failing
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs font-semibold bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400 border-gray-200">
            No Grades
          </Badge>
        )
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto px-5">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5 shrink-0" />
            <SheetTitle className="text-xl capitalize">{subject.subjectName}</SheetTitle>
          </div>
          <SheetDescription className="flex items-center gap-1.5 text-xs">
            <User className="h-3.5 w-3.5 shrink-0" /> Teacher:{" "}
            <span className="font-medium text-foreground">{teacherFullName}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Average Banner */}
          <Card className="border bg-gradient-to-br from-primary/5 via-background to-background shadow-2xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">My Average</p>
                  <p className="text-2xl font-bold tracking-tight mt-0.5">
                    {subject.status === "No Grades" ? "—" : subject.averageGrade}{" "}
                    <span className="text-xs text-muted-foreground font-normal">
                      / {subject.maxGrade}
                    </span>
                  </p>
                </div>
              </div>
              {getStatusBadge(subject.status)}
            </CardContent>
          </Card>

          {/* Grades Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-tight">Grades Breakdown</h3>
            <div className="rounded-lg border bg-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="pl-4">Assessment</TableHead>
                    <TableHead className="text-right pr-4">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subject.assessments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-xs text-muted-foreground py-6">
                        No individual grade records recorded yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    subject.assessments.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="pl-4 text-xs sm:text-sm">
                          <div className="font-medium">{item.title || item.type}</div>
                          {item.weight > 0 && (
                            <div className="text-[10px] text-muted-foreground">
                              Weight: {item.weight}%
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-bold pr-4 text-xs sm:text-sm">
                          {item.grade === null ? (
                            <span className="text-muted-foreground font-normal">—</span>
                          ) : (
                            <span className="text-primary">
                              {item.grade} / {item.maxGrade}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}