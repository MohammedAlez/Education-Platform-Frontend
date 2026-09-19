"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { School, Users, ArrowRight } from "lucide-react"
import { TeacherClass } from "@/types/teacher"

interface ClassCardProps {
  classData: TeacherClass
}

export function ClassCard({ classData }: ClassCardProps) {
  // Extract subject names or default to N/A
  const subjectNames =
    classData.subjects?.map((s) => s.name).join(", ") || "No Subject Assigned"

  return (
    <Card className="rounded-2xl border bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Card Header: Icon, Name, Subject Badge */}
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 dark:bg-purple-950/40 rounded-xl text-purple-600 dark:text-purple-400">
              <School className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground tracking-tight">
              {classData.name}
            </h3>
          </div>

          <Badge
            variant="outline"
            className="bg-amber-50/70 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-900/40 dark:text-amber-400 font-medium px-2.5 py-0.5 rounded-full text-xs"
          >
            {subjectNames}
          </Badge>
        </CardHeader>

        {/* Card Content: Enrolled Students Box */}
        <CardContent className="px-5 py-3">
          <div className="bg-muted/40 border rounded-xl p-3.5 flex items-center gap-3">
            <div className="text-muted-foreground">
              <Users className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Enrolled Students</p>
              <p className="text-base font-bold text-foreground">
                {classData.studentsCount} {classData.studentsCount === 1 ? "Student" : "Students"}
              </p>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Card Footer: Open Class Action */}
      <CardFooter className="p-5 pt-2">
        <Button
          variant="outline"
          className="w-full justify-between rounded-xl h-10 border-muted font-medium hover:bg-accent group p-0"
        >
          <Link
            href={`/dashboard/teacher/students?classId=${classData.id}`}
            className="w-full h-full flex items-center justify-between px-4"
          >
            <span>Open Class</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-muted-foreground" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}