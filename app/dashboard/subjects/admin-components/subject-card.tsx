import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { School, GraduationCap, ArrowRight, MoreVertical, BookOpen } from "lucide-react"

export interface SubjectItem {
  id: string
  name: string
  classesCount: number
  teachersCount: number
}

const mockSubjects: SubjectItem[] = [
  { id: "math", name: "Mathematics", classesCount: 4, teachersCount: 2 },
  { id: "physics", name: "Physics", classesCount: 3, teachersCount: 2 },
  { id: "cs", name: "Computer Science", classesCount: 2, teachersCount: 1 },
  { id: "english", name: "English", classesCount: 4, teachersCount: 3 },
  { id: "arabic", name: "Arabic", classesCount: 4, teachersCount: 2 },
]

export function SubjectGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockSubjects.map((subject) => (
        <Card
          key={subject.id}
          className="group relative flex flex-col justify-between border shadow-xs transition-all hover:border-amber-500/40 hover:shadow-md"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg font-bold tracking-tight">
                  {subject.name}
                </CardTitle>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
                <School className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Classes</p>
                  <p className="text-sm font-semibold">{subject.classesCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
                <GraduationCap className="h-4 w-4 text-sky-500 dark:text-sky-400" />
                <div>
                  <p className="text-xs text-muted-foreground">Teachers</p>
                  <p className="text-sm font-semibold">{subject.teachersCount}</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2">
            <Button
              
              variant="outline"
              className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              <Link href={`/dashboard/subjects/${subject.id}`}>
                <span>View Subject</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}