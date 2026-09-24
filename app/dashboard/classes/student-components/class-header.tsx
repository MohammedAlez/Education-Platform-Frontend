"use client"

import { Card, CardContent } from "@/components/ui/card"
import { School, Users } from "lucide-react"
import { StudentClassSummary } from "@/types/student-portal"
import { cn } from "@/lib/utils"

interface ClassCardsGridProps {
  classes: StudentClassSummary[]
  selectedClassId: string
  onSelectClass: (classId: string) => void
  studentCount: number
}

export function ClassHeader({
  classes,
  selectedClassId,
  onSelectClass,
  studentCount,
}: ClassCardsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {classes.map((cls) => {
        const isSelected = cls.id === selectedClassId
        // Display active student count on selected card or fallback badge count
        const displayCount = isSelected ? studentCount : null

        return (
          <Card
            key={cls.id}
            onClick={() => onSelectClass(cls.id)}
            className={cn(
              "cursor-pointer transition-all border shadow-xs hover:border-primary/50",
              isSelected
                ? "border-primary bg-gradient-to-r from-primary/5 via-background to-background ring-1 ring-primary"
                : "bg-card hover:bg-muted/30"
            )}
          >
            <CardContent className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "p-3 rounded-xl shrink-0 transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <School className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">{cls.name}</h2>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Users className="h-3.5 w-3.5" />
                    <span>
                      {displayCount !== null ? `${displayCount} Students` : "Enrolled Class"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}