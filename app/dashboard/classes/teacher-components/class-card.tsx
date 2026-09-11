import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { School, Users, ArrowRight } from "lucide-react"

export interface TeacherClassItem {
  id: string
  name: string
  studentCount: number
  subject: string
}

const mockTeacherClasses: TeacherClassItem[] = [
  { id: "class-a", name: "Class A", studentCount: 28, subject: "Mathematics" },
  { id: "class-b", name: "Class B", studentCount: 31, subject: "Mathematics" },
  { id: "class-c", name: "Class C", studentCount: 26, subject: "Mathematics" },
]

export function ClassGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockTeacherClasses.map((cls) => (
        <Card
          key={cls.id}
          className="group relative flex flex-col justify-between border shadow-xs transition-all hover:border-purple-500/40 hover:shadow-md"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                  <School className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-bold tracking-tight">
                  {cls.name}
                </CardTitle>
              </div>
              <Badge
                variant="secondary"
                className="bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 font-normal"
              >
                {cls.subject}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-3">
              <Users className="h-4 w-4 text-sky-500 dark:text-sky-400" />
              <div>
                <p className="text-xs text-muted-foreground">Enrolled Students</p>
                <p className="text-sm font-semibold">{cls.studentCount} Students</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Button
              
              variant="outline"
              className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              <Link href={`/dashboard/classes/${cls.id}`} >
                <span>Open Class</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}