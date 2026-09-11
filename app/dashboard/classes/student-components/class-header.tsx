"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { School, Users } from "lucide-react"

interface ClassHeaderProps {
  className?: string
  studentCount: number
}

export function ClassHeader({ className = "Class A", studentCount = 28 }: ClassHeaderProps) {
  return (
    <Card className="border shadow-xs bg-gradient-to-r from-primary/5 via-background to-background">
      <CardContent className="p-6 py-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary/10 text-primary">
            <School className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{className}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Overview of your registered class, subjects, and teaching faculty.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit text-sm py-1 px-3 gap-1.5 rounded-lg border">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{studentCount}</span> Students
        </Badge>
      </CardContent>
    </Card>
  )
}