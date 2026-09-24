"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { StudentSubject } from "@/types/student-portal"

interface ClassSubjectsProps {
  subjects: StudentSubject[]
}

export function ClassSubjects({ subjects }: ClassSubjectsProps) {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Class Subjects
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {subjects.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="flex items-center gap-3 p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold capitalize">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {subject.status || "Active Course"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground py-6 text-center border border-dashed rounded-md">
            No subjects assigned to this class yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}