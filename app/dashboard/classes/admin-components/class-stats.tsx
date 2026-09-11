import { Card, CardContent } from "@/components/ui/card"
import { School, GraduationCap, BookOpen, UserCheck } from "lucide-react"

const statsData = [
  {
    title: "Total Classes",
    value: "12",
    icon: School,
    bgColor: "bg-purple-50/60 dark:bg-purple-950/20",
    borderColor: "border-purple-100 dark:border-purple-900/40",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Total Enrolled",
    value: "245",
    icon: GraduationCap,
    bgColor: "bg-sky-50/60 dark:bg-sky-950/20",
    borderColor: "border-sky-100 dark:border-sky-900/40",
    iconColor: "text-sky-500 dark:text-sky-400",
  },
  {
    title: "Active Subjects",
    value: "8",
    icon: BookOpen,
    bgColor: "bg-amber-50/60 dark:bg-amber-950/20",
    borderColor: "border-amber-100 dark:border-amber-900/40",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    title: "Assigned Teachers",
    value: "18",
    icon: UserCheck,
    bgColor: "bg-emerald-50/60 dark:bg-emerald-950/20",
    borderColor: "border-emerald-100 dark:border-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
]

export function ClassStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => {
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
  )
}