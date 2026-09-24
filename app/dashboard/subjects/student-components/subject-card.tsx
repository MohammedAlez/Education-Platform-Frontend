"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ChevronRight, Calculator, Atom, Laptop, BookOpen } from "lucide-react"
import { StudentSubjectItem } from "@/types/student-portal"

interface SubjectCardProps {
  subject: StudentSubjectItem
  onClick: (subject: StudentSubjectItem) => void
}

const getSubjectIcon = (name: string) => {
  const lowerName = name.toLowerCase()
  if (lowerName.includes("math")) return Calculator
  if (lowerName.includes("physic") || lowerName.includes("science")) return Atom
  if (lowerName.includes("computer") || lowerName.includes("code") || lowerName.includes("tech")) return Laptop
  return BookOpen
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const Icon = getSubjectIcon(subject.subjectName)
  const teacherFullName = `${subject.teacher.firstName} ${subject.teacher.lastName}`.trim()

  return (
    <Card
      onClick={() => onClick(subject)}
      className="border shadow-xs hover:shadow-md transition-all cursor-pointer group hover:border-primary/50 relative overflow-hidden"
    >
      <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight text-base group-hover:text-primary transition-colors capitalize">
                {subject.subjectName}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <User className="h-3 w-3 shrink-0" />
                <span>Teacher: {teacherFullName || "Unassigned"}</span>
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-xs text-muted-foreground font-medium">Average</span>
          <Badge variant="secondary" className="font-bold text-sm px-2.5 py-0.5">
            {subject.status === "No Grades" ? "—" : `${subject.averageGrade} / ${subject.maxGrade}`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}