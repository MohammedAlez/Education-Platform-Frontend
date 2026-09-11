"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, BookOpen, FileText, CheckCircle2 } from "lucide-react"

export interface GradeEntry {
  type: string
  score: string
}

export interface SubjectGradeDetail {
  id: string
  subject: string
  average: string
  history: GradeEntry[]
}

interface GradeHistorySheetProps {
  subject: SubjectGradeDetail | null
  isOpen: boolean
  onClose: () => void
}

export function GradeHistorySheet({ subject, isOpen, onClose }: GradeHistorySheetProps) {
  if (!subject) return null

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <SheetTitle className="text-xl font-bold">{subject.subject}</SheetTitle>
          </div>
          <SheetDescription className="text-xs">
            Complete mark history breakdown for this course.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Average Display */}
          <Card className="border bg-gradient-to-br from-purple-500/5 via-background to-background shadow-2xs">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Subject Average</p>
                  <p className="text-2xl font-bold tracking-tight mt-0.5">
                    {subject.average} <span className="text-xs text-muted-foreground font-normal">/ 20</span>
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/60">
                Passing
              </Badge>
            </CardContent>
          </Card>

          {/* Grade History Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Grade History
            </h3>

            <div className="grid gap-3">
              {subject.history.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-lg border bg-card hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-semibold text-foreground">{item.type}</span>
                  </div>
                  <div className="flex items-baseline gap-1 font-bold text-primary">
                    <span className="text-base">{item.score}</span>
                    <span className="text-xs text-muted-foreground font-medium">/ 20</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}