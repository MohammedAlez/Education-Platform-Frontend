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

export interface GradeItem {
  type: string
  score: string
}

export interface SubjectDetail {
  id: string
  title: string
  teacher: string
  average: string
  grades: GradeItem[]
}

interface SubjectDetailSheetProps {
  subject: SubjectDetail | null
  isOpen: boolean
  onClose: () => void
}

export function SubjectDetailSheet({ subject, isOpen, onClose }: SubjectDetailSheetProps) {
  if (!subject) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <SheetTitle className="text-xl">{subject.title}</SheetTitle>
          </div>
          <SheetDescription className="flex items-center gap-1.5 text-xs">
            <User className="h-3.5 w-3.5" /> Teacher: <span className="font-medium text-foreground">{subject.teacher}</span>
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Average Banner */}
          <Card className="border bg-gradient-to-br from-primary/5 via-background to-background shadow-2xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">My Average</p>
                  <p className="text-2xl font-bold tracking-tight mt-0.5">{subject.average} <span className="text-xs text-muted-foreground font-normal">/ 20</span></p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60">
                Passing
              </Badge>
            </CardContent>
          </Card>

          {/* Grades Table */}
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
                  {subject.grades.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium pl-4 text-xs sm:text-sm">
                        {item.type}
                      </TableCell>
                      <TableCell className="text-right font-bold pr-4 text-xs sm:text-sm">
                        {item.score === "—" ? (
                          <span className="text-muted-foreground font-normal">—</span>
                        ) : (
                          <span className="text-primary">{item.score}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}