"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { School, Users, ArrowRight } from "lucide-react"

interface GradeClassCardProps {
  className: string
  classDescription?: string
  subjectName: string
  studentsCount: number
  onSelect: () => void
}

export function GradeClassCard({
  className,
  classDescription,
  subjectName,
  studentsCount,
  onSelect,
}: GradeClassCardProps) {
  return (
    <Card className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 dark:bg-purple-950/40 rounded-xl text-purple-600 dark:text-purple-400">
            <School className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground tracking-tight">
              {className}
            </h3>
            {classDescription && (
              <p className="text-xs text-muted-foreground">{classDescription}</p>
            )}
          </div>
        </div>

        <Badge
          variant="outline"
          className="bg-amber-50/70 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900/40 font-medium px-2.5 py-0.5 rounded-full text-xs"
        >
          {subjectName}
        </Badge>
      </CardHeader>

      <CardContent className="px-5 py-3">
        <div className="bg-muted/40 border rounded-xl p-3 flex items-center gap-3">
          <Users className="h-4 w-4 text-sky-500" />
          <span className="text-xs font-medium text-muted-foreground">
            {studentsCount} Enrolled Students
          </span>
        </div>
      </CardContent>

      <div className="p-5 pt-2">
        <Button
          variant="outline"
          onClick={onSelect}
          className="w-full justify-between rounded-xl h-10 border-muted font-medium hover:bg-accent group"
        >
          <span>Manage Grades</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-muted-foreground" />
        </Button>
      </div>
    </Card>
  )
}