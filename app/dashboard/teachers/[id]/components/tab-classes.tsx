import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { School, Users } from "lucide-react"

const assignedClasses = [
  { name: "Class A", studentCount: 32, schedule: "Mon, Wed, Fri" },
  { name: "Class B", studentCount: 28, schedule: "Tue, Thu" },
]

export function TabClasses() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {assignedClasses.map((c) => (
        <Card key={c.name} className="shadow-xs border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-bold">{c.name}</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400">
              <School className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{c.studentCount} Students Enrolled</span>
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Schedule: <span className="text-foreground">{c.schedule}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}