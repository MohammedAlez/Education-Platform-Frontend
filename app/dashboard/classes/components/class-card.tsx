import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, UserCheck, ArrowRight, MoreVertical } from "lucide-react"

export interface ClassItem {
  id: string
  name: string
  studentsCount: number
  subjectsCount: number
  classTeacher?: string
}

const mockClasses: ClassItem[] = [
  {
    id: "class-a",
    name: "Class A",
    studentsCount: 28,
    subjectsCount: 5,
    classTeacher: "Ahmed Benali",
  },
  {
    id: "class-b",
    name: "Class B",
    studentsCount: 31,
    subjectsCount: 5,
    classTeacher: "Sara Ali",
  },
  {
    id: "class-c",
    name: "Class C",
    studentsCount: 25,
    subjectsCount: 6,
    classTeacher: "Karim Hassan",
  },
  {
    id: "class-d",
    name: "Class D",
    studentsCount: 29,
    subjectsCount: 4,
  },
]

export function ClassGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockClasses.map((item) => (
        <Card
          key={item.id}
          className="group relative flex flex-col justify-between border shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold tracking-tight">
                {item.name}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Stats Pills */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Students</p>
                  <p className="text-sm font-semibold">{item.studentsCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
                <BookOpen className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Subjects</p>
                  <p className="text-sm font-semibold">{item.subjectsCount}</p>
                </div>
              </div>
            </div>

            {/* Class Teacher Badge */}
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Class Teacher
              </p>
              {item.classTeacher ? (
                <div className="inline-flex items-center gap-2 rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                  <UserCheck className="h-3.5 w-3.5 text-primary" />
                  {item.classTeacher}
                </div>
              ) : (
                <Badge variant="outline" className="text-xs text-muted-foreground border-dashed">
                  Unassigned
                </Badge>
              )}
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Button
              
              variant="outline"
              className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              <Link href={`/dashboard/classes/${item.id}`}>
                <span>View Class</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}