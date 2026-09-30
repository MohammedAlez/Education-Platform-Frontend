"use client"

import { useApiQuery } from "@/hooks/use-api"
import { Card, CardContent } from "@/components/ui/card"
import { School, Award, Percent, BookOpen, Loader2 } from "lucide-react"
import { OverviewStatsResponse } from "@/types/student-overview"

export function StudentStatsCards() {
  const { data, isLoading } = useApiQuery<OverviewStatsResponse>(
    ["student-overview-stats"],
    "/student/me/overview/stats"
  )

  const statsData = data?.data

  const stats = [
    {
      title: "Class",
      value: statsData?.className || "—",
      icon: School,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300",
    },
    {
      title: "Average",
      value: statsData?.averageGrade || "—",
      icon: Award,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      title: "Attendance",
      value: statsData?.attendanceRate || "—",
      icon: Percent,
      color: "text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400",
    },
    {
      title: "Subjects",
      value: statsData?.subjectsCount !== undefined ? String(statsData.subjectsCount) : "—",
      icon: BookOpen,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="border shadow-xs h-20 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border shadow-xs">
            <CardContent className="p-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold tracking-tight mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}