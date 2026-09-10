import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

const subjects = [
  "Mathematics",
  "Physics",
  "Computer Science",
  "English",
  "Arabic",
]

export function TabSubjects() {
  return (
    <Card className="shadow-xs border">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Curriculum Subjects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((sub) => (
            <div
              key={sub}
              className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm">{sub}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}