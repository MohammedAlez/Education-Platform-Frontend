"use client"

import { useRouter } from "next/navigation"
import { useApiQuery } from "@/hooks/use-api"
import { TEACHER_CLASSES_PATH, TEACHER_CLASSES_QUERY_KEY } from "@/lib/queries/teachers"
import { TeacherClass } from "@/types/teacher"
import { GradeClassCard } from "./grade-class-card"
import { Skeleton } from "@/components/ui/skeleton"

export function TeacherGradesPage() {
  const router = useRouter()

  const { data: classesRes, isLoading } = useApiQuery<any>(
    TEACHER_CLASSES_QUERY_KEY,
    TEACHER_CLASSES_PATH
  )

  const classes: TeacherClass[] = Array.isArray(classesRes)
    ? classesRes
    : classesRes?.data || []

  const handleSelectClass = (params: {
    classId: string
    className: string
    subjectName: string
    teachingAssignmentId: string
  }) => {
    const searchParams = new URLSearchParams({
      className: params.className,
      subjectName: params.subjectName,
      teachingAssignmentId: params.teachingAssignmentId,
    })

    router.push(`/dashboard/grades/${params.classId}?${searchParams.toString()}`)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Grades</h1>
        <p className="text-sm text-muted-foreground">
          Select a class to view and update student grades.
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4 text-foreground">Select Class & Subject</h2>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-44 w-full rounded-2xl" />
            ))}
          </div>
        ) : classes.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">
            No classes or teaching assignments found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.flatMap((cls) =>
              cls.subjects.map((subj) => (
                <GradeClassCard
                  key={`${cls.id}-${subj.id}`}
                  className={cls.name}
                  classDescription={cls.description}
                  subjectName={subj.name}
                  studentsCount={cls.studentsCount}
                  onSelect={() =>
                    handleSelectClass({
                      classId: cls.id,
                      className: cls.name,
                      subjectName: subj.name,
                      teachingAssignmentId: subj.teachingAssignmentId,
                    })
                  }
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}