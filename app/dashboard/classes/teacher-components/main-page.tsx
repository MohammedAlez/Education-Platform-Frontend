"use client"

import { useApiQuery } from "@/hooks/use-api"
import { TEACHER_CLASSES_PATH, TEACHER_CLASSES_QUERY_KEY } from "@/lib/queries/teachers"
import { TeacherClass } from "@/types/teacher"
import { ClassCard } from "./class-card"
import { Skeleton } from "@/components/ui/skeleton"

export function ClassesSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="border rounded-2xl p-5 space-y-4 bg-card">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      ))}
    </div>
  )
}

export default function TeacherClassesPage() {
  const { data: classesRes, isLoading } = useApiQuery<any>(
    TEACHER_CLASSES_QUERY_KEY,
    TEACHER_CLASSES_PATH
  )

  const classes: TeacherClass[] = Array.isArray(classesRes)
    ? classesRes
    : classesRes?.data || []

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Classes
        </h1>
        <p className="text-sm text-muted-foreground">
          View assigned class sections and access student rosters or gradebooks.
        </p>
      </div>

      {/* Grid List */}
      {isLoading ? (
        <ClassesSkeleton />
      ) : classes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center">
          <p className="text-lg font-medium text-foreground">No classes assigned</p>
          <p className="text-sm text-muted-foreground mt-1">
            You haven't been assigned to any classes yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <ClassCard key={cls.id} classData={cls} />
          ))}
        </div>
      )}
    </div>
  )
}