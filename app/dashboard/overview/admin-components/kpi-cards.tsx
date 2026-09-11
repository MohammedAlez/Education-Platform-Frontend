import { Card, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, School, Banknote } from "lucide-react"

const kpiData = [
  {
    title: "Students",
    value: "245",
    description: "↑ 8 this month",
    icon: GraduationCap,
    bgColor: "bg-purple-50/60 dark:bg-purple-950/20",
    borderColor: "border-purple-100 dark:border-purple-900/40",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Teachers",
    value: "18",
    description: "Active",
    icon: Users,
    bgColor: "bg-sky-50/60 dark:bg-sky-950/20",
    borderColor: "border-sky-100 dark:border-sky-900/40",
    iconColor: "text-sky-500 dark:text-sky-400",
  },
  {
    title: "Classes",
    value: "12",
    description: "Active",
    icon: School,
    bgColor: "bg-amber-50/60 dark:bg-amber-950/20",
    borderColor: "border-amber-100 dark:border-amber-900/40",
    iconColor: "text-amber-500 dark:text-amber-400",
  },
  {
    title: "Revenue",
    value: "450,000 DA",
    description: "This month",
    icon: Banknote,
    bgColor: "bg-emerald-50/60 dark:bg-emerald-950/20",
    borderColor: "border-emerald-100 dark:border-emerald-900/40",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
]

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card
            key={kpi.title}
            className={`border shadow-none transition-all hover:shadow-xs ${kpi.bgColor} ${kpi.borderColor}`}
          >
            <CardContent className="p-6 py-1">
              <div className="flex items-center justify-between space-x-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {kpi.value}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center">
                  <Icon className={`h-8 w-8 ${kpi.iconColor}`} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                <span className="font-medium">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}