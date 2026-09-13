import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, ArrowRight, MoreVertical } from "lucide-react"
import { ClassItem } from "@/types/class"

interface ClassCardProps {
  classItem: ClassItem
  subjectCount: number
}

export function ClassCard({ classItem, subjectCount }: ClassCardProps) {
  return (
    <Card className="border shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <h3 className="font-bold text-lg text-foreground">{classItem.name}</h3>
          {classItem.description && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{classItem.description}</p>
          )}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-muted/40 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Students</p>
              <p className="text-base font-bold text-foreground">{classItem.studentCount || 0}</p>
            </div>
          </div>

          <div className="p-3 bg-muted/40 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Subjects</p>
              <p className="text-base font-bold text-foreground">{subjectCount}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0d">
        <Button  variant="outline" className="w-full ">
          <Link href={`/dashboard/classes/${classItem.id}`} className="w-full flex  justify-between text-xs font-semibold group">
            View Class
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}