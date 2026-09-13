import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Building2, GraduationCap, ArrowRight, MoreVertical } from "lucide-react"
import { SubjectItem } from "@/types/subject"

interface SubjectCardProps {
  subject: SubjectItem
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const assignments = subject.teachingAssignments || []

  // Count assigned classes for this subject
  const classesCount = new Set(
    assignments.map((a) => a.class?.id).filter(Boolean)
  ).size

  // Count unique teachers for this subject
  const teachersCount = new Set(
    assignments.map((a) => a.teacher?.id).filter(Boolean)
  ).size

  return (
    <Card className="border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100/70 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground capitalize">{subject.name}</h3>
            {subject.description && (
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{subject.description}</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/40 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Classes</p>
              <p className="text-base font-bold text-foreground">{classesCount}</p>
            </div>
          </div>

          <div className="p-3 bg-muted/40 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Teachers</p>
              <p className="text-base font-bold text-foreground">{teachersCount}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="">
        <Button variant="outline" className="w-full ">
          <Link href={`/dashboard/subjects/${subject.id}`} className="w-full flex justify-between text-xs font-semibold group">
            View Subject
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}