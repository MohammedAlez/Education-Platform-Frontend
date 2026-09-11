"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ChevronRight, Calculator, Atom, Laptop, BookOpen } from "lucide-react"
import { SubjectDetail } from "./subject-detail-sheet"

interface SubjectCardProps {
  subject: SubjectDetail
  onClick: (subject: SubjectDetail) => void
}

const subjectIcons: Record<string, any> = {
  Mathematics: Calculator,
  Physics: Atom,
  "Computer Science": Laptop,
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const Icon = subjectIcons[subject.title] || BookOpen

  return (
    <Card
      onClick={() => onClick(subject)}
      className="border shadow-xs hover:shadow-md transition-all cursor-pointer group hover:border-primary/50 relative overflow-hidden"
    >
      <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold tracking-tight text-base group-hover:text-primary transition-colors">
                {subject.title}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <User className="h-3 w-3" /> Teacher: {subject.teacher}
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <span className="text-xs text-muted-foreground font-medium">Average</span>
          <Badge variant="secondary" className="font-bold text-sm px-2.5 py-0.5">
            {subject.average} / 20
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}