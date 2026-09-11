import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Percent } from "lucide-react"

interface ClassOverviewProps {
  className: string
  studentCount: number
  averageGrade: string
  attendanceRate: string
}

export function ClassDetailOverview({
  className,
  studentCount,
  averageGrade,
  attendanceRate,
}: ClassOverviewProps) {
  const stats = [
    {
      title: "Total Students",
      value: `${studentCount} Students`,
      icon: Users,
      bgColor: "bg-purple-50/60 dark:bg-purple-950/20",
      borderColor: "border-purple-100 dark:border-purple-900/40",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Average Grade",
      value: averageGrade,
      icon: Award,
      bgColor: "bg-emerald-50/60 dark:bg-emerald-950/20",
      borderColor: "border-emerald-100 dark:border-emerald-900/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Attendance Rate",
      value: attendanceRate,
      icon: Percent,
      bgColor: "bg-sky-50/60 dark:bg-sky-950/20",
      borderColor: "border-sky-100 dark:border-sky-900/40",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className={`border shadow-none transition-all hover:shadow-xs ${stat.bgColor} ${stat.borderColor}`}
            >
              <CardContent className="p-6 py-0">
                <div className="flex items-center justify-between space-x-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}