import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const subjects = ["Mathematics", "Physics", "Computer Science", "English", "Chemistry"]

export function TabAcademic() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-xs border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Current Class</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">Class A</p>
          <p className="text-xs text-muted-foreground mt-1">Academic Year 2025/2026</p>
        </CardContent>
      </Card>

      <Card className="shadow-xs border">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Enrolled Subjects</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {subjects.map((sub) => (
            <Badge key={sub} variant="secondary" className="px-3 py-1 bg-accent text-accent-foreground">
              {sub}
            </Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}