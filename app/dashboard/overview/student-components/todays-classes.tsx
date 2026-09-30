"use client"

import { useApiQuery } from "@/hooks/use-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, Loader2 } from "lucide-react"
import { TodayClassesResponse } from "@/types/student-overview"

export function StudentTodaysClasses() {
  const { data, isLoading } = useApiQuery<TodayClassesResponse>(
    ["student-classes-today"],
    "/student/me/classes/today"
  )

  const todayClasses = data?.data || []

  return (
    <Card className="border shadow-xs h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          Today's Classes
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : todayClasses.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-8">
            No classes scheduled for today.
          </p>
        ) : (
          <div className="space-y-4">
            {todayClasses.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 shrink-0">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">{item.subjectName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.room} • {item.teacherName}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-background border shadow-2xs shrink-0">
                  {item.startTime}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}