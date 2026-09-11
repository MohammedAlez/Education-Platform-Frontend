"use client"

import { Card, CardContent } from "@/components/ui/card"
import { School, Award, Percent, BookOpen } from "lucide-react"

export function StudentStatsCards() {
  const stats = [
    {
      title: "Class",
      value: "Class A",
      icon: School,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-300",
    },
    {
      title: "Average",
      value: "15.8 / 20",
      icon: Award,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400",
    },
    {
      title: "Attendance",
      value: "94%",
      icon: Percent,
      color: "text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400",
    },
    {
      title: "Subjects",
      value: "5",
      icon: BookOpen,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border shadow-xs">
            <CardContent className="p-4 py-0 flex items-center justify-between">
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