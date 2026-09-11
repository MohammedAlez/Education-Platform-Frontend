"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calculator, Atom, Laptop, Globe, Languages } from "lucide-react"

const subjects = [
  { name: "Mathematics", icon: Calculator, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400" },
  { name: "Physics", icon: Atom, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400" },
  { name: "Computer Science", icon: Laptop, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400" },
  { name: "English", icon: Globe, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400" },
  { name: "Arabic", icon: Languages, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400" },
]

export function ClassSubjects() {
  return (
    <Card className="border shadow-xs">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          Class Subjects
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const Icon = subject.icon
            return (
              <div
                key={subject.name}
                className="flex items-center gap-3 p-3.5 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className={`p-2.5 rounded-md ${subject.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground">Active Course</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}